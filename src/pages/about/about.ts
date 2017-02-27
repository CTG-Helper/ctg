import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {TranslateService, LangChangeEvent} from "ng2-translate";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService) {
  }


  ngOnInit() {
    this.viewCtrl.setBackButtonText(this.translateService.instant('BACK'));
    this.initText();
  }



  initText() {

  }



  close() {
    this.viewCtrl.dismiss();
  }
}
