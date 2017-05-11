import React, {Component} from 'react';

const dcopy = require('deep-copy');
import {throttle} from '../../assets/js/helpers'

export class MapPlacemark extends Component{
    constructor(props){
        super(props)
        this.myMap = null;
        this.myPlacemark = null;
        this.isCoordsValid = false;
        this.options = {
            coords: props.coords || ['', ''],
            zoom : props.zoom || 13
        }

    }

    componentWillReceiveProps(nextProps){

        if (nextProps.coords[0] !== this.options.coords[0] || nextProps.coords[1] !== this.options.coords[1]){
            this.options.coords = nextProps.coords
        }

        var lat = this.options.coords[0],
            lon = this.options.coords[1];

        if ( lat !== undefined && lon !== undefined && (lat !== 0 && lon !== 0) )
            this.isCoordsValid = true

        if (!this.myMap && this.isCoordsValid)
            this.mapInit();
    }

    createPlacemark(coords){
        var self = this;

        self.myPlacemark = new ymaps.Placemark(coords, {}, {
            preset: 'islands#violetStretchyIcon',
            draggable: false
        });

        self.myMap.geoObjects.add(self.myPlacemark);

    };

    mapInit(){
        let self = this;

        ymaps.ready(function(){

            var mapCenter = self.options.coords;

            self.myMap = new ymaps.Map(self.refs.ya_map, {
                center: mapCenter,
                zoom: self.options.zoom,
                controls : ['typeSelector', 'fullscreenControl', 'zoomControl']
            });

            self.createPlacemark(mapCenter)

        });

    }

    render(){
        if (!this.isCoordsValid) return false

        return(
            <div className="map map_placemark">
                <div className="map__yandex" ref="ya_map">

                </div>
            </div>
        )


    }
}

export class MapAdding extends Component{
    constructor(props){
        super(props)
        this.myMap = null;
        this.myPlacemark = null;
        this.options = {
            zoom : this.props.zoom || 10
        }

    }

    componentDidMount(){
        this.mapInit();
    }

    throttlePositionPlacemark = throttle(::this.positionPlacemark, 1000)
    throttlePositionPlacemarkAddress = throttle(::this.positionPlacemarkAddress, 1000)

    componentWillReceiveProps(nextProps){

        let oldLatitude  = this.props.form.fields.latitude.value
        let oldLongitude = this.props.form.fields.longitude.value
        let newLatitude  = nextProps.form.fields.latitude.value
        let newLongitude = nextProps.form.fields.longitude.value

        let oldAddress = this.props.form.fields.address.value
        let newAddress = nextProps.form.fields.address.value
        let coords = []

        if (newLatitude !== '' && newLongitude !== '' && (oldLatitude !== newLatitude || oldLongitude !== newLongitude )){
            coords = [newLatitude, newLongitude];

            this.throttlePositionPlacemark(coords, false)
        } else if (newAddress !== '' && newAddress !== oldAddress){

            this.throttlePositionPlacemarkAddress(newAddress)
        }



    }

    setCoordsPlacemark(coords){
        if (this.myPlacemark)
            this.myPlacemark.geometry.setCoordinates(coords);
        else
            this.createPlacemark(coords)
    }

    positionPlacemarkAddress(address, isNotChange){
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
                self.setCoordsPlacemark(coords)

                if(!isNotChange)
                    self.onChangePosition(coords, address);
            });

        });


    }
    positionPlacemark(coords, isNotChange){
        let self = this;

        self.setCoordsPlacemark(coords);

        if (!isNotChange)
            ymaps.geocode(coords, {
               results: 1
            }).then(function (res) {
                // Выбираем первый результат геокодирования.
                let firstGeoObject = res.geoObjects.get(0),
                   // Координаты геообъекта.
                    address = firstGeoObject.properties.get('text');

                self.onChangePosition(coords, address);

            });

    }

    onChangePosition(coords, address){
        let self = this;
        let form = dcopy(self.props.form);

        form.fields.latitude.value = coords[0]
        form.fields.longitude.value = coords[1]
        form.fields.address.value = address

        self.props.updateForm.call(self, form)
    }

    createPlacemark(coords){
        var self = this;

        self.myPlacemark = new ymaps.Placemark(coords, {}, {
            preset: 'islands#violetStretchyIcon',
            draggable: true
        });

        self.myMap.geoObjects.add(self.myPlacemark);

        // Слушаем событие окончания перетаскивания на метке.
        self.myPlacemark.events.add('dragend', function (e) {
            var curCoords = self.myPlacemark.geometry.getCoordinates();

            self.positionPlacemark(curCoords)
        });

    };

    mapInit(){
        let self = this;

        ymaps.ready(function(){

            var geolocation = ymaps.geolocation,
                mapCenter = null;

            geolocation.get({
                provider: 'auto'
            }).then(function (result) {

                mapCenter = result.geoObjects.position

                self.myMap = new ymaps.Map(self.refs.ya_map, {
                    center: mapCenter,
                    zoom: self.options.zoom,
                    controls : ['typeSelector', 'fullscreenControl', 'zoomControl']
                });

                self.myMap.events.add('click', function (e) {
                    var coords = e.get('coords');

                    self.positionPlacemark(coords);
                });



            },function(e){
                console.log(e)
            })

        });

    }
    render(){
        return(
            <div className="map map_adding">
                <div className="map__yandex" ref="ya_map">

                </div>
            </div>
        )
    }
}
