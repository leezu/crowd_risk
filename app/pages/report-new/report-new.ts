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

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private modalCtrl: ModalController,
              private reportService: ReportService) {}

  ionViewLoaded() {
    this.report = this.navParams.get('report');

    if (!this.report) {
      this.report = new Report();

      Geolocation.getCurrentPosition({
        timeout: 3000,
        enableHighAccuracy: true,
        maximumAge: 3600000
      })
        .then((resp) => {
          this.report.location.coordinates = [
            // MongoDB requires order longitude, latitude (!)
            resp.coords.longitude,
            resp.coords.latitude
          ]

          this.gotLocation = true;

          // LeafletJS requires order latitude, longitude (!)
          this.loadMap([resp.coords.latitude, resp.coords.longitude]);
        })
        .catch(error => {
          console.log(JSON.stringify(error));

          // MongoDB requires order longitude, latitude (!)
          this.report.location.coordinates = [153.028056, -27.476944]
          this.gotLocation = true;

          this.loadMap([-27.476944,153.028056]);
        });
    }
    else {
      this.isNew = false;
      this.action = 'Edit';

      this.gotLocation = true;
      setTimeout(() => {
        this.loadMap([this.report.location.coordinates[1],
                      this.report.location.coordinates[0]]);
      }, 300);
    }

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

  editLocation() {
    let modal = this.modalCtrl.create(LocationPage, {latLng: [
      this.report.location.coordinates[1],
      this.report.location.coordinates[0]
    ]});

    modal.onDidDismiss(latLng => {
      this.report.location.coordinates = [latLng[1], latLng[0]];
      this.marker.setLatLng(latLng);
    });

    modal.present();
  }

  save() {
    if (this.isNew) {
      this.reportService.add(this.report)
        .catch(e => console.error(JSON.stringify(e)));
    } else {
      this.reportService.update(this.report)
        .catch(e => console.error(JSON.stringify(e)));
    }

    this.dismiss();
  }

  delete() {
    this.reportService.delete(this.report)
      .catch(e => console.error(JSON.stringify(e)));

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.report);
  }
}
