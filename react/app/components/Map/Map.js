import React, {Component} from 'react';

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

    componentWillReceiveProps(nextProps){
        let latitude = nextProps.form.fields.latitude.value
        let longitude = nextProps.form.fields.longitude.value
        let coords = []

        if (latitude !== '' && longitude !== ''){
            coords = [latitude, longitude];
            this.createPlacemark(coords)
        }

    }

    createPlacemark(coords){
        var self = this;
        var myMap = self.myMap;


        if (self.myPlacemark) {
            console.log('1')
            self.myPlacemark.geometry.setCoordinates(coords);

            //self.myPlacemarkCoords = coords;
            //self._getGeoAddress(self.myPlacemarkCoords, self._setMapDescr );

        }
        // Если нет – создаем.
        else {
            console.log('2')
            self.myPlacemark = new ymaps.Placemark(coords, {}, {
                preset: 'islands#violetStretchyIcon',
                draggable: true
            });
            console.log(self.myPlacemark)

            self.myMap.geoObjects.add(self.myPlacemark);

            // self.myPlacemarkCoords = coords;
            // self._getGeoAddress(self.myPlacemarkCoords, self._setMapDescr);
            //
            // // Слушаем событие окончания перетаскивания на метке.
            // self.myPlacemark.events.add('dragend', function (e) {
            //     var curCoords = self.myPlacemark.geometry.getCoordinates();
            //
            //     self.myPlacemarkCoords = curCoords;
            //
            //     self._getGeoAddress(curCoords, self._setMapDescr);
            // });
        }

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
                    controls : ['typeSelector', 'fullscreenControl']
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
