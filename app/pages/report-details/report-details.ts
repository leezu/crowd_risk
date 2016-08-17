import {Component, Input} from '@angular/core';
import {NavParams, NavController, ViewController, ModalController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Geolocation} from 'ionic-native';
import {ReportService, Report} from '../../providers/report-service/report-service';
import {LocationPage} from '../location/location';
import {AuthService} from '../../providers/auth-service/auth-service';
import * as Leaflet from "leaflet";

@Component({
  templateUrl: 'build/pages/report-details/report-details.html',
})
export class ReportDetailsPage {
  report: Report;

  private map: any;
  private marker: any;
  private latLng: number[];

  private authorizedUser: boolean;

  @Input() comments;
  private comment: string;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private modalCtrl: ModalController,
              private auth: AuthService,
              private reportService: ReportService) {}

  ionViewLoaded() {
    this.report = this.navParams.get('report');
    this.loadMap(this.getLatLng());

    if (this.report.user == this.auth.user.user_id) {
      this.authorizedUser = true;
    }

    this.reportService.getComments(this.report)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  getLatLng() {
    return [this.report.location.coordinates[1], this.report.location.coordinates[0]];
  }

  loadMap(latLng: number[]) {
    // The icon imagePath autodetection fails with ionic2
    Leaflet.Icon.Default.imagePath = 'build/images';

    this.map = Leaflet
      .map("report-details-map")
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

  delete() {
    this.reportService.delete(this.report)
      .catch(console.error.bind(console));

    this.dismiss();
  }

  addComment() {
    this.reportService.addComment(this.report, this.comment)
      .catch(console.error.bind(console));

    this.comment = "";

    // Timeout to wait for new changes to be reflected in backend
    setTimeout(() => {
      this.reportService.getComments(this.report)
        .subscribe((comments) => {
          this.comments = comments;
        });
    }, 500);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.report);
  }
}
