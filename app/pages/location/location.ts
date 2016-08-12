import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
import * as Leaflet from "leaflet";
import "leaflet-geocoder-mapzen";


@Component({
  templateUrl: 'build/pages/location/location.html',
})
export class LocationPage {

  private map: any;
  private marker: any;
  private latLng: number[];

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {}

  ionViewLoaded() {
    this.latLng = this.navParams.get('latLng');

    if (!this.latLng) {
      // TODO: Default location is Brisbane
      console.log("Using default location (brisbane)")
      this.latLng = [-27.28, 153.02];
    }

    this.loadMap(this.latLng);
  }

  loadMap(latLng: number[]) {
    // The icon imagePath autodetection fails with ionic2
    Leaflet.Icon.Default.imagePath = 'build/images';

    this.map = Leaflet
      .map("map")
      .setView(latLng, 15);
    this.map.zoomControl.setPosition('bottomright');

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    this.marker = Leaflet
      .marker(latLng, {
        draggable: true,
        icon: new L.Icon.Default()
      })
      .addTo(this.map);

    var geocoder = Leaflet.control.geocoder('search-UP2dMqV', {
      markers: false,
      panToPoint: false
    }).addTo(this.map);

    geocoder.on('select', (e) => {
      this.latLng = [e.latlng.lat, e.latlng.lng];
      this.marker.setLatLng(this.latLng);
    });
  }

  goBack() {
    var location = this.marker.getLatLng();
    this.latLng = [location.lat, location.lng];

    this.viewCtrl.dismiss(this.latLng);
  }
}
