import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';

/*
  Generated class for the ReportCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/report-creation/report-creation.html',
})
export class ReportCreationPage {
  public base64Image: string;

  constructor(private nav: NavController) {

  }

  takePicture(){
    Camera.getPicture({
     destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
