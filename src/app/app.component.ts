import { Component, OnInit, AfterViewInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, polyline, Map, point, circle, polygon } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  theMap: Map;

  currentPosition: any;

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                          {
                            detectRetina: true,
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          }
  );

  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
                      {
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      }
  );

  // Marker for my home
  home = marker(
      [ 38.108, 13.335 ],
      {
        icon: icon(
          {
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          }
        )
      }
  );

  // Marker for the parking destination
  parking = marker(
    [ 38.000, 13.000 ],
    {
      icon: icon(
        {
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        }
      )
    }
  );

  // Path from home to paradise
  route = polyline(
    [
      [ 38.108, 13.335 ],
      [ 38.1234567890123, 13.1234567890123 ],
      [ 38.0000567890123, 13.1234567890123 ],
      [ 38.000, 13.000 ],
    ]
  );

  // Layers control object with our two base layers and the three overlay layer
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'My Home': this.home,
      'The Parking': this.parking,
      'Path with polyline': this.route,
      'Big Circle': circle( [ 38.000, 13.000 ], {color: 'blue', fillColor: '#0F0', fillOpacity: 0.1, radius: 7000} ),
      'Big Square': polygon( [[38.088, 13.155], [38.188, 13.155], [38.188, 13.255], [38.088, 13.255]] )
    }
  };

  options = {
    layers: [ this.streetMaps, this.home ],
    zoom: 11,
    center: latLng([38.088, 13.155])
  };

  onMapReady(map: Map) {
    console.log('Callback metodo onMapReady');
    this.theMap = map;
  }

  onMapClick(infoClick: any) {
    console.log('Chiamato metodo onMapClick()');
    console.log(infoClick);
    console.log(this.currentPosition);
  }

  onMapMove() {
    console.log('Chiamato metodo onMapMove()');
  }

  onMapZoom() {
    console.log('Chiamato metodo onMapZoom()');
  }

  ngOnInit(): void {
    console.log('Chiamato metodo ngOnInit()');
    this.currentPosition = null;
    this.getLocation();
    // const tmp = this.watchPosition();
  }

  ngAfterViewInit(): void {
    console.log('Chiamato metodo ngAfterViewInit()');
    // this.theMap.locate();
    this.theMap.on('locationfound', this.onLocationFound, this);
    this.theMap.on('locationerror', this.onLocationError, this);
  }

  private onLocationFound(event: any) {
    this.currentPosition = event;
  }

  private onLocationError(event: any) {
    alert(event.message);
  }

  // Secondo metodo: Get user location from navigator.geolocation
  private getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.locationError);
    } else {
        console.log('Geo Location not supported by browser');
    }
  }

  private showPosition(position: any) {
    if (position) {
      const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
      };
      console.log(location);
      localStorage.setItem('currentLongitude', position.coords.longitude);
      localStorage.setItem('currentLatitude', position.coords.latitude);
    }
  }

  private locationError(error: any) {
    console.log(error);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return 'User denied the request for Geolocation.';
        case error.POSITION_UNAVAILABLE:
            return 'Location information is unavailable.';
        case error.TIMEOUT:
            return 'The request to get user location timed out.';
        case error.UNKNOWN_ERROR:
            return 'An unknown error occurred.';
    }
  }

  private watchPosition(): number {
    if (navigator.geolocation) {
      const watchID =  navigator.geolocation.watchPosition(this.showPosition, this.locationError);
      return watchID;
    } else {
      console.log('Geo Location not supported by browser');
      return null;
    }
  }

}
