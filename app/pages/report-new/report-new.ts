import { Component } from '@angular/core';
import {NavParams, NavController, ViewController, ModalController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Geolocation} from 'ionic-native';
import {ReportService, Report} from '../../providers/report-service/report-service';
import {LocationPage} from '../location/location';
import * as Leaflet from "leaflet";

@Component({
  templateUrl: 'build/pages/report-new/report-new.html',
})
export class ReportNewPage {
  report: Report;
  public isNew = true;
  public gotLocation = false;
  public action = 'Add';

  private map: any;
  private marker: any;
  public latLng: number[];

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private modalCtrl: ModalController,
              private reportService: ReportService) {}

  ionViewLoaded() {
    this.report = this.navParams.get('report');

    if (!this.report) {
      this.report = new Report();
    }
    else {
      this.isNew = false;
      this.action = 'Edit';
    }

    Geolocation.getCurrentPosition()
      .then((resp) => {
        this.report.location.coordinates = [
          // MongoDB requires order longitude, latitude (!)
          resp.coords.longitude,
          resp.coords.latitude
        ]

        // Store for convenience in order latitude longitude
        // (e.g. used by LeafletJS)
        this.latLng = [
          resp.coords.latitude,
          resp.coords.longitude
        ];

        this.gotLocation = true;

        this.loadMap(this.latLng);
      })
      .catch(console.error.bind(console));
  }

  loadMap(latLng: number[]) {
    // The icon imagePath autodetection fails with ionic2
    Leaflet.Icon.Default.imagePath = 'build/images';

    this.map = Leaflet
      .map("preview-map")
      .setView(latLng, 15);
    this.map.zoomControl.setPosition('bottomright');

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    this.marker = Leaflet
      .marker(latLng, {
        icon: new L.Icon.Default()
      })
      .addTo(this.map);
  }

  takePicture(){
    Camera.getPicture({
     destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.report.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  editLocation(latLng) {
    let modal = this.modalCtrl.create(LocationPage, {latLng: latLng})

    modal.onDidDismiss(latLng => {
      this.latLng = latLng;
      this.report.location.coordinates = [latLng[1], latLng[0]];
      this.marker.setLatLng(this.latLng);
    });

    modal.present();
  }

  save() {
    if (this.isNew) {
      this.reportService.add(this.report)
        .catch(console.error.bind(console));
    } else {
      this.reportService.update(this.report)
        .catch(console.error.bind(console));
    }

    this.dismiss();
  }

  delete() {
    this.reportService.delete(this.report)
      .catch(console.error.bind(console));

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.report);
  }
}
