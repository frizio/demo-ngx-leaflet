import { Component, OnInit, AfterViewInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, polyline, Map, point, circle, polygon } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  theMap: Map;

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
    console.log('Chiamato metodo onMapReady');
    this.theMap = map;
  }

  onMapClick(infoClick: any) {
    console.log('Chiamato metodo onMapClick()');
    console.log(infoClick);
  }

  onMapMove() {
    console.log('Chiamato metodo onMapMove()');
  }

  onMapZoom() {
    console.log('Chiamato metodo onMapZoom()');
  }

  ngOnInit(): void {
    console.log('Inizializzato componente');
  }

  ngAfterViewInit(): void {
    console.log('Chiamato metodo ngAfterViewInit()');
    console.log(this.theMap);
  }

}
