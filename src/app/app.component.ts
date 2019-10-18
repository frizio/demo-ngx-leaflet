import { Component } from '@angular/core';
import { tileLayer, latLng, marker, icon, polyline, Map, point } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'My Home': this.home,
      'The Parking': this.parking,
      'Path with polyline': this.route
    }
  };

  options = {
    layers: [ this.streetMaps, this.home ],
    zoom: 11,
    center: latLng([38.088, 13.155])
  };

  onMapReady(map: Map) {
    console.log('Chiamato metodo onMapReady');
    map.fitBounds(
      this.route.getBounds(),
      {
        padding: point(24, 24),
        maxZoom: 12,
        animate: true
      }
    );
  }

}
