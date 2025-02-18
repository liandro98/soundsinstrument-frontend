import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-nosotros-page',
  templateUrl: './nosotros-page.component.html',
  styleUrl: './nosotros-page.component.css'
})

export class NosotrosPageComponent implements OnInit {
  map!: mapboxgl.Map;
  
  // Ubicación de la tienda
  tiendaLocation = {
    lat: 21.15807928872347, // Latitud
    lng: -100.934855475740391 // Longitud
  };

  ngOnInit(): void {
    // Inicializamos el mapa centrado en la ubicación de la tienda
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [this.tiendaLocation.lng, this.tiendaLocation.lat], // Centro inicial
      zoom: 15, // Nivel de zoom
      accessToken: 'pk.eyJ1IjoieHJhaWRlciIsImEiOiJjbTJzbzF6cWwxZG4zMmtwdHBiejlxaXN1In0.OmxNUluNtN0g-hpwMbu4lQ' // Token aquí directamente
    });

    // Agregamos un marcador en la ubicación de la tienda
    new mapboxgl.Marker()
      .setLngLat([this.tiendaLocation.lng, this.tiendaLocation.lat])
      .addTo(this.map);

    // Trazamos la ruta desde la ubicación del usuario hasta la tienda
    this.traceRoute();
  }

  // Método para obtener la ubicación actual del usuario y trazar la ruta
  traceRoute() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation: [number, number] = [position.coords.longitude, position.coords.latitude];

        // Colocamos un marcador en la ubicación del usuario
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(userLocation)
          .addTo(this.map);

        // Calculamos y dibujamos la ruta desde el usuario hasta la tienda
        this.drawRoute(userLocation, [this.tiendaLocation.lng, this.tiendaLocation.lat]);
      });
    } else {
      alert("Geolocation no es compatible con este navegador.");
    }
  }

  drawRoute(start: [number, number], end: [number, number]) {
    const accessToken = 'pk.eyJ1IjoieHJhaWRlciIsImEiOiJjbTJzbzF6cWwxZG4zMmtwdHBiejlxaXN1In0.OmxNUluNtN0g-hpwMbu4lQ';
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry.coordinates;
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }
          },
          paint: {
            'line-width': 5,
            'line-color': '#3887be'
          }
        });
      });
  }
}