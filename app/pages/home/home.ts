import {Component, Input} from '@angular/core';
import {NavController, Platform, ToastController} from 'ionic-angular';
import {ReportDetailsPage} from '../report-details/report-details';
import {ReportNewPage} from '../report-new/report-new';
import {ReportService} from '../../providers/report-service/report-service';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; // Imports all RxJS Observable operators
import { Geolocation } from 'ionic-native';
import {AuthService} from '../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  @Input() reports;

  constructor(private reportService: ReportService,
              private navCtrl: NavController,
              private auth: AuthService,
              private toastController: ToastController,
              private platform: Platform) {}

  createReport() {
    if (!this.auth.authenticated()) {
      let toast = this.toastController.create({
        message: 'You need log in before creating reports. ' +
          'You can login using the buttom in the upper right corner.',
        duration: 3000
      });

      toast.present();
    } else {
      this.navCtrl.push(ReportNewPage);
    }
  }

  showDetail(report) {
    this.navCtrl.push(ReportDetailsPage, {report: report});
  }

  doRefresh(refresher) {
    this.reportService.getAll()
      .subscribe((reports) => {
        this.reports = reports;
        refresher.complete();
      });
  }

  ionViewWillEnter() {
    // Timeout to wait for new changes to be reflected in backend
    setTimeout(() => {
      this.reportService.getAll()
        .subscribe((reports) => {
          this.reports = reports;
        });
    }, 500);
  }
}
