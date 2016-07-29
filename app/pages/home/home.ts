import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ReportCreationPage} from '../report-creation/report-creation';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

  create_report() {
    this.navCtrl.push(ReportCreationPage, {});
  }
}
