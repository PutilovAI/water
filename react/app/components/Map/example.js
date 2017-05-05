/*------------  Новый скрипт на Jquery ------------*/

    /*-------- Карта yandex --------*/

    var BMapCoord = function(options){
            this.myMap              = null;
            this.myPlacemark        = null;
            this.myPlacemarkCoords  = null;
            this.myPlacemarkAddress = null;
            this.$inputLat          = options.$inputLat;
            this.$inputLong         = options.$inputLong;
            this.$inputAddress      = options.$inputAddress;
            this.$inputRegion       = options.$inputRegion;
            this.$mapDescrAddress   = options.$mapDescrAddress;
            this.$mapDescrLat       = options.$mapDescrLat;
            this.$mapDescrLong      = options.$mapDescrLong;
            this.mapCenter          = options.mapCenter || [55.753994, 37.622093];

    };

    BMapCoord.prototype.init = function($mapContainer){

        var self = this;
        var myMap = self.myMap;

        ymaps.ready(function(){

            if (!myMap){
                self.createMap(self.mapCenter, $mapContainer);

                self.myMap.events.add('click', function (e) {
                    var coords = e.get('coords');

                    self.createPlacemark(coords);
                });
            }

        });

    };
    BMapCoord.prototype.work = function(){
        var self = this;

        var regionVal   = $('.upload-photos__photo_current_yes .js-b-input-coord_region').val();
        var addressVal  = $('.upload-photos__photo_current_yes .js-b-input-coord_address').val();
        var latVal      = $('.upload-photos__photo_current_yes .js-b-input-coord_lat').val();
        var longVal     = $('.upload-photos__photo_current_yes .js-b-input-coord_long').val();
        var myMap       = self.myMap;
        var myPlacemark = self.myPlacemark;
        if (self.myMap) {
            self.myMap.container.fitToViewport();
        }
        ymaps.ready(function(){

            if ( latVal !== '' && longVal !== ''){
                var coords = [latVal, longVal];

                self._moveMapCoords(coords, self.createPlacemark);

            } else if ( addressVal !== '' ){
                self._moveMapAddress(addressVal, self.createPlacemark);

            } else if ( regionVal !== '' ){
                self._moveMapRegion(regionVal);
            }

        });
    };
    BMapCoord.prototype.newPlacemark = function(coords){
        return new ymaps.Placemark(coords, {}, {
            preset: 'islands#violetStretchyIcon',
            draggable: true
        });
    };
    BMapCoord.prototype.createPlacemark = function(coords){
        var self = this;
        var myMap = self.myMap;


        if (self.myPlacemark) {
            self.myPlacemark.geometry.setCoordinates(coords);

            self.myPlacemarkCoords = coords;
            self._getGeoAddress(self.myPlacemarkCoords, self._setMapDescr );

        }
        // Если нет – создаем.
        else {
            self.myPlacemark = self.newPlacemark(coords);

            self.myMap.geoObjects.add(self.myPlacemark);

            self.myPlacemarkCoords = coords;
            self._getGeoAddress(self.myPlacemarkCoords, self._setMapDescr);

            // Слушаем событие окончания перетаскивания на метке.
            self.myPlacemark.events.add('dragend', function (e) {
                var curCoords = self.myPlacemark.geometry.getCoordinates();

                self.myPlacemarkCoords = curCoords;

                self._getGeoAddress(curCoords, self._setMapDescr);
            });
        }

    };
    BMapCoord.prototype.createMap = function(center, $mapContainer){
        var self = this;

        self.myMap = new ymaps.Map($mapContainer[0], {
            center: center,
            zoom: 9,
            controls : ['searchControl', 'typeSelector', 'fullscreenControl']
        }, {
            minZoom: 2,
            suppressMapOpenBlock: true
        });

        // Создадим пользовательский макет ползунка масштаба.
        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='b-map__control'>" +
                   "<button class='b-map__control-item b-map__control-item_zoom-in js-b-map-control-item_zoom js-b-map-control-item_zoom-in'></button>" +
                   "<button class='b-map__control-item b-map__control-item_zoom-out js-b-map-control-item_zoom js-b-map-control-item_zoom-out'></button>" +
               "</div>", {

               // Переопределяем методы макета, чтобы выполнять дополнительные действия
               // при построении и очистке макета.
               build: function () {
                   // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    var self = this;
                    var $contolsZoom = $('.js-b-map-control-item_zoom');
                    var $controlZoomIn = $('.js-b-map-control-item_zoom-in');
                    var $controlZoomOut = $('.js-b-map-control-item_zoom-out');
                    var myMap = this.getData().control.getMap();


                    myMap.events.add('boundschange', function(){

                        //Запрашиваем максимальный и минимальный зум в данной точке
                        myMap.zoomRange.get(myMap.getCenter()).then(function (zoomRange) {
                            var maxZoom = zoomRange[1];
                            var minZoom = zoomRange[0];
                            var curZoom = myMap.getZoom();

                            if ( maxZoom === curZoom ){
                                myMap.events.fire('mapZoomMax');

                            } else if ( minZoom === curZoom ) {
                                myMap.events.fire('mapZoomMin');

                            } else {
                                myMap.events.fire('mapZoomNorm');
                            }

                        });
                    });

                    myMap.events.add('mapZoomMax', function(){
                        self.buttonDesable( $controlZoomIn );
                    });

                    myMap.events.add('mapZoomMin', function(){
                        self.buttonDesable( $controlZoomOut );
                    });

                    myMap.events.add('mapZoomNorm', function(){
                        self.buttonEnable( $contolsZoom );
                    });
                   // Привязываем функции-обработчики к контексту и сохраняем ссылки
                   // на них, чтобы потом отписаться от событий.
                   this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                   this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                   // Начинаем слушать клики на кнопках макета.
                   $controlZoomIn.on('click.mapzoom', this.zoomInCallback);
                   $controlZoomOut.on('click.mapzoom', this.zoomOutCallback);

               },

               clear: function () {
                   // Снимаем обработчики кликов.
                   $('.js-b-map-control-item_zoom-in').off('click.mapzoom', this.zoomInCallback);
                   $('.js-b-map-control-item_zoom-out').off('click.mapzoom', this.zoomOutCallback);

                   // Вызываем родительский метод clear.
                   ZoomLayout.superclass.clear.call(this);
               },

               zoomIn: function (e) {
                   var $curControl =  $(e.target);

                   if ( $curControl.hasClass('b-map__control-item_desable') ) return false;

                   var self = this;
                   var map = self.getData().control.getMap();
                   var curZoom = map.getZoom();

                   self.events.fire('zoomchange', {
                      oldZoom: curZoom,
                      newZoom: curZoom + 1
                   });

               },

               zoomOut: function (e) {
                   var $curControl =  $(e.target);

                   if ( $curControl.hasClass('b-map__control-item_desable') ) return false;

                   var self = this;
                   var map = self.getData().control.getMap();
                   var curZoom = map.getZoom();

                   self.events.fire('zoomchange', {
                      oldZoom: curZoom,
                      newZoom: curZoom - 1
                   });

               },

               buttonDesable : function($button){
                   $button.addClass('b-map__control-item_desable');
               },

               buttonEnable : function($buttons){
                   $buttons.removeClass('b-map__control-item_desable');
               }

        });

        // Создадим пользовательский макет геолокации
        var GeoLocationLayout = ymaps.templateLayoutFactory.createClass("<div class='b-map__control b-map__control_location'>" +
                   "<button class='b-map__control-item b-map__control-item_location js-b-map-control-location'></button>" +
               "</div>"
        );

        var myGeolocationControl = new ymaps.control.Button({
                data: {},
                options: {
                    layout: GeoLocationLayout,
                    position:{
                        top: 320,
                        left: 10
                    }
                }
        });

        var zoomControl = new ymaps.control.ZoomControl({ options: {
            layout: ZoomLayout,
            float: 'none',
            position:{
                top: 170,
                left: 10
            }
         } });

        self.myMap.controls.add(zoomControl);
        self.myMap.controls.add(myGeolocationControl);

        myGeolocationControl.events.add('click', function(){
            self._mapGeolocation();
        } );

        $mapContainer.addClass('js-b-map_created');


    };
    BMapCoord.prototype._mapGeolocation = function(){
        var self = this;
        var geolocation = ymaps.geolocation;

        geolocation.get({
            provider: 'yandex',
            mapStateAutoApply: true
        }).then(function (result) {
            // Красным цветом пометим положение, вычисленное через ip.
            result.geoObjects.options.set('preset', 'islands#redCircleIcon');
            result.geoObjects.get(0).properties.set({
                hintContent: 'Мое местоположение'
            });
            self.myMap.geoObjects.add(result.geoObjects);
        });
    };
    BMapCoord.prototype._moveMapCoords = function(coords, callback){
        var self = this;

        ymaps.geocode(coords, {
           results: 1
        }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
               // Координаты геообъекта.
               firstGeoObjectCoords = firstGeoObject.geometry.getCoordinates(),
               bounds = firstGeoObject.properties.get('boundedBy');
            self.myMap.setBounds(bounds, {
               // Проверяем наличие тайлов на данном масштабе.
               checkZoomRange: true,
               duration: 500

            }).then(function(){
               callback.call(self, coords);
            });

        });
    };
    BMapCoord.prototype._moveMapAddress = function(address, callback){
        var self = this;
        ymaps.geocode(address, {
           results: 1
        }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
               // Координаты геообъекта.
               coords = firstGeoObject.geometry.getCoordinates(),
               bounds = firstGeoObject.properties.get('boundedBy');

            self.myMap.setBounds(bounds, {
               // Проверяем наличие тайлов на данном масштабе.
               checkZoomRange: true,
               duration: 500

            }).then(function(){
               callback.call(self, coords);
            });

        });
    };

    BMapCoord.prototype._moveMapRegion = function(region, callback){
        var self = this;
        ymaps.geocode(region, {
           results: 1
        }).then(function (res) {
               // Выбираем первый результат геокодирования.
               var firstGeoObject = res.geoObjects.get(0),
                   // Координаты геообъекта.
                   coords = firstGeoObject.geometry.getCoordinates(),
                   // Область видимости геообъекта.
                   bounds = firstGeoObject.properties.get('boundedBy');

                //var addressOut = firstGeoObject.properties.get('text');

               // Масштабируем карту на область видимости геообъекта.
               self.myMap.setBounds(bounds, {
                   // Проверяем наличие тайлов на данном масштабе.
                   checkZoomRange: true,
                   duration: 700
               });

               callback(coords);

           });
    };
    BMapCoord.prototype.setInputValue = function(){
        var self = this;
        var coords = self.myPlacemarkCoords;
        var address = self.myPlacemarkAddress;

        if ( self.myPlacemark ){
            $timeout(function(){
                $scope.currentUpload.latitude = coords[0];
                $scope.currentUpload.longitude = coords[1];
            }, 0);
            //$scope.currentUpload.address = address;
            //
            self.$inputLat.val( coords[0] );
            self.$inputLong.val( coords[1] );
            //self.$inputAddress.val( address );
        }

    };
    BMapCoord.prototype._getGeoAddress = function(coords, callback){
        var self = this;

        ymaps.geocode(coords, {
           results: 1
        }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
               // Координаты геообъекта.
                address = firstGeoObject.properties.get('text');

            self.myPlacemarkAddress = address;

            callback.call(self);

        });
    };

    BMapCoord.prototype._setMapDescr = function(){
        var self = this;
        $('.js-b-popup-map-descr-address').html(self.myPlacemarkAddress);
        $('.js-b-popup-map-descr-lat').html(self.myPlacemarkCoords[0]);
        $('.js-b-popup-map-descr-long').html(self.myPlacemarkCoords[1]);
    };
