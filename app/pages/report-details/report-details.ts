import { Component } from '@angular/core';
import {NavParams, NavController, ViewController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {ReportService, Report} from '../../providers/report-service/report-service';

@Component({
  templateUrl: 'build/pages/report-details/report-details.html',
})
export class ReportDetailsPage {
  report: Report;
  public isNew = true;
  public action = 'Add';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private reportService: ReportService) {}

  ionViewLoaded() {
    this.report = this.navParams.get('report');

    if (!this.report) {
      this.report = new Report("", "", "", "");
    }
    else {
      this.isNew = false;
      this.action = 'Edit';
    }
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
  ionViewWillLeave() {
    console.log("details leaving")
  }
}
