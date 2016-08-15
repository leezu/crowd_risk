import {Component} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {ReportDetailsPage} from '../report-details/report-details';
import {ReportService} from '../../providers/report-service/report-service';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; // Imports all RxJS Observable operators
import { Geolocation } from 'ionic-native';
import {AuthService} from '../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  reports;

  constructor(private reportService: ReportService,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private auth: AuthService,
              private platform: Platform) {}

  showDetail(report) {
    let modal = this.modalCtrl.create(ReportDetailsPage, {report: report})
    modal.present();
  }

  ionViewWillEnter() {
    console.log("view enters updating reports array")

    this.platform.ready().then(() => {
      this.reportService.getAll()
        .subscribe(reports => this.reports = reports);
    });
  }
}
