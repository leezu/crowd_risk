import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {ReportService, Report} from '../../providers/report-service/report-service';

@Component({
  templateUrl: 'build/pages/report-creation/report-creation.html',
})
export class ReportCreationPage {
  report: Report = null;

  constructor(private nav: NavController, private reportService: ReportService) {
    this.report = new Report("", "", "");
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
    this.reportService.saveReport(this.report);
    this.nav.pop();
  }

  cancel() {
    this.nav.pop();
  }

}
