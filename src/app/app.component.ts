import { Component } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  options = {
    layers: [
      tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'}
      )
    ],
    zoom: 11,
    center: latLng([38.088, 13.155])
  };

 }
