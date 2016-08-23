import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Http} from '@angular/http';
import {ReportService} from './providers/report-service/report-service';
import {UserService} from './providers/user-service/user-service';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './providers/auth-service/auth-service';

let prodMode: boolean = window.hasOwnProperty('cordova');

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})

export class MyApp {

  private rootPage: any;

  constructor(
    private platform: Platform,
    private authHttp: AuthHttp,
    private auth: AuthService
  ) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // When the app starts up, there might be a valid
      // token in local storage. If there is, we should
      // schedule an initial token refresh for when the
      // token expires
      this.auth.startupTokenRefresh();
    });
  }
}

ionicBootstrap(MyApp, [
  disableDeprecatedForms,
  provideForms,
  ReportService,
  UserService,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService
], {prodMode: prodMode});
