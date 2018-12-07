// import * as loadGoogleMapsApi from 'load-google-maps-api';
// const loadGoogleMapsApi = require('load-google-maps-api');

export default function map() {
  class googleMap {
    constructor(conf) {
      this.elem = $(conf.el);
      this.markers = conf.markers;
      if (conf.marker) {
        this.marker = {
          w: conf.marker.w || 30,
          h: conf.marker.h || 48,
          icon: conf.marker.icon ? conf.marker.icon : 'img/pin-sm.png'
        };
      } else {
        this.marker = {
          w: 30,
          h: 48,
          icon: 'img/pin-sm.png'
        };
      }


      this._init();
    }

    _init() {
      window.onload = this._loadMapsAPI()
    }
    _createScript(url, callback) {
      var script = document.createElement( 'script' );
      if( callback ) script.onload = callback;
      script.type = 'text/javascript';
      script.src = url;
      document.body.appendChild( script );
    }
    _loadMapsAPI() {
      let self = this;
      const mapKey = self.elem.data('map-key');
      this._createScript('https://maps.googleapis.com/maps/api/js?key=' + mapKey, function () {
        self._initMap();
      });
    }
    _initMap() {
      let self = this;
      const mapWrapper = this.elem,
        zoomValue = parseInt(mapWrapper.data('zoom')),
        dataCoords = mapWrapper.data('coords').split(','),
        coords = {
          lat: parseFloat(dataCoords[0]),
          lng: parseFloat(dataCoords[1])
        };

      const icon = {
        url: this.marker.icon,
        scaledSize: new google.maps.Size(this.marker.w, this.marker.h), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(20, 40) // anchor
      };

      let map = new google.maps.Map(mapWrapper[0], {
        zoom: zoomValue,
        center: coords,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false
      });
      this.markers.forEach((el)=>{
        const marker = new google.maps.Marker({
          position: el.position,
          map: map,
          icon: icon
        });
      });
    }
  }



  let initMap = new googleMap({
    el: $('.js-map'),
    markers: [
      {
        position: {
          lat: 50.451639,
          lng: 30.595805
        },
      },
      {
        position: {
          lat: 50.46,
          lng: 30.595805
        },
      }
    ],
    marker: {
      // w: 40,
      // h: 40,
      // icon: 'img/pin-sm.png'
    }
  });
  // let map;
  // loadGoogleMapsApi({key: 'AIzaSyA53TY2KmyEXDJIxHl1OQwDT2d6OmYG-vM'}).then(function (googleMaps) {
    // map = new googleMaps.Map(document.querySelector('.map'), {
    //   center: {
    //     lat: 50.451639,
    //     lng: 30.595805
    //   },
    //   zoom: 12,
      // zoom: 16,
    // });
    // var infowindow = googleMaps.InfoWindow.setContent('<b>القاهرة</b>');
    // setTimeout(()=>{
    //   console.log(map);
    //   map.center.lat = 42;
    //   }, 2000);
    // let icons = {
    //   captain: {
    //     icon: 'img/pin-sm.png'
    //   },
    //   library: {
    //     icon: 'img/pin.png'
    //   }
    // };
    // let features = [
    //   {
    //     position: {
    //       lat: 50.451639,
    //       lng: 30.595805
    //     },
    //     type: 'captain'
    //   }
    // ];
  //   features.forEach(function(feature) {
  //     var marker = new google.maps.Marker({
  //       position: feature.position,
  //       icon: icons[feature.type].icon,
  //       map: map
  //     });
  //   });
  // }).catch(function (error) {
  //   console.error(error)
  // });



}
