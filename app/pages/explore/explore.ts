import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service/auth-service';
import {ReportService} from '../../providers/report-service/report-service';
import * as Leaflet from "leaflet";
import "leaflet-geocoder-mapzen";
import "leaflet.heat";

@Component({
  templateUrl: 'build/pages/explore/explore.html'
})
export class ExplorePage {
  private map: any;
  private heat: any;
  private qutLatLng = [-27.476944,153.028056];

  // Set to true if map is initialized
  private loaded = false;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private reportService: ReportService
  ) {}

  ionViewLoaded() {
    this.loadMap();
    this.updateHeat();
    this.loaded = true;
  }

  ionViewWillEnter() {
    if (this.loaded)
      this.updateHeat();
  }

  loadMap() {
    // The icon imagePath autodetection fails with ionic2
    Leaflet.Icon.Default.imagePath = 'build/images';

    this.map = Leaflet
      .map("explore-map")
      .setView(this.qutLatLng, 13);
    this.map.zoomControl.setPosition('bottomright');

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    var geocoder = Leaflet.control.geocoder('search-UP2dMqV', {
      markers: false,
      panToPoint: false
    }).addTo(this.map);

    this.heat = L.heatLayer([], {
      maxZoom: 10,
      gradient: {1: 'red'}
    }).addTo(this.map);
  }

  updateHeat() {
    var reports = this.reportService.getAll()
      .subscribe((reports) => {
        this.heat.setLatLngs(reports.map((r) => {
          // LeafletJS requires LatLng format whereas MongoDB returns LngLat
          // Add importance of point (set to 0.3)
          return [r.location.coordinates[1], r.location.coordinates[0], 0.3];
        }));
      });
  }
}
