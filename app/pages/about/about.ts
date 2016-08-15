import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor(
    private navCtrl: NavController,
    private auth: AuthService
  ) {
  }
}
