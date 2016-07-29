import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {ReportService} from './providers/report-service/report-service';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ReportService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [disableDeprecatedForms, provideForms]);
