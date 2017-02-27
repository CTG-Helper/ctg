import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {TranslateService} from "ng2-translate";
import {StartPage} from "../pages/start/start";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = StartPage;

  defaultLanguage = "sv";

  constructor(platform: Platform, translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      translateService.setDefaultLang(this.defaultLanguage);

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
