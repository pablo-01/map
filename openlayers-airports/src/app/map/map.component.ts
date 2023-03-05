import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { Circle } from 'ol/geom';
import CircleStyle from 'ol/style/Circle';
import { Airport } from './airports.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map!: Map;
  public airports: Airport[] = [];


 

  public geolactaion_points_dummy = [
    { "id": 1, "name": "ZSSH", "city": "HIA", "airport": "Lianshui Airport", "country": "Huai'an", "state": "Jiangsu", "code": "CN", "lat": 28, "long": 33.7908333333, "timezone": "Asia/Shanghai", "dst": "" },
    { "id": 2, "name": "ZSSL", "city": "", "airport": "Shanghai Longhua Airport", "country": "Shanghai", "state": "Shanghai", "code": "CN", "lat": 0, "long": 31.1669006348, "timezone": "Asia/Shanghai", "dst": "" },
    { "id": 3, "name": "ZSSM", "city": "SQJ", "airport": "Sanming Shaxian Airport", "country": "Sanming", "state": "Fujian", "code": "CN", "lat": 820, "long": 26.428056, "timezone": "Asia/Shanghai", "dst": "" },
    { "id": 4, "name": "ZSSS", "city": "SHA", "airport": "Shanghai Hongqiao International Airport", "country": "Shanghai", "state": "Shanghai", "code": "CN", "lat": 10, "long": 31.1979007721, "timezone": "Asia/Shanghai", "dst": "" },
    { "id": 5, "name": "ZSSZ", "city": "SZV", "airport": "Guangfu Airport", "country": "Suzhou", "state": "Jiangsu", "code": "CN", "lat": 0, "long": 31.2630996704, "timezone": "Asia/Shanghai", "dst": "" }
  ];

  constructor() {
    this.getAirports();
    
   }

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2, maxZoom: 18
      })
    });
  }

  showAirports() {
    const markers = new VectorLayer({
      className: 'airports',
      source: new VectorSource({
        features: this.geolactaion_points_dummy.map(airport => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([airport.long, airport.lat])),
            name: airport.name
          });
          return feature;
        })
      }),
      style: function(feature) {
        return new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        });
      }
    });
    this.map.addLayer(markers);
  }

  // clear all layers
  clearAirports() {
    this.map.getLayers().forEach(layer => {
      if (layer instanceof VectorLayer) {
        this.map.removeLayer(layer);
      }
    });
    }

      // get airports from api at: https://localhost:5001/api/airports
  getAirports() {
    fetch('https://localhost:5001/api/airports')
      .then(response => response.json())
      .then(data => {
        this.airports = data;
        // sort airports by iata_code
        this.airports.sort((a, b) => {
          if (a.iata_code < b.iata_code) {
            return -1;
          }
          if (a.iata_code > b.iata_code) {
            return 1;
          }
          return 0;
        }
        );
      }
    );
  }

  showAllAirports() {
    const markers = new VectorLayer({
      className: 'airports',
      source: new VectorSource({
        features: this.airports.map(airport => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([airport.lon_decimal, airport.lat_decimal])),
            name: airport.name
          });
          return feature;
        })
      }),
      style: function(feature) {
        return new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        });
      }
    });
    this.map.addLayer(markers);



  }

  showAirport(event: any) {
    console.log(event.target.value);
    const airport = this.airports.find(a => a.iata_code === event.target.value);
    if (airport) {
      // marker for selected airport
      const markers = new VectorLayer({
        className: 'airports',
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(fromLonLat([airport.lon_decimal, airport.lat_decimal])),
              name: airport.name
            })
          ]
        }),
        style: function(feature) {
          return new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: 'red' }),
              stroke: new Stroke({ color: 'black', width: 1 })
            })
          });
        }
      });
      this.map.addLayer(markers);
    }
  }


}







