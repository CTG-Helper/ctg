import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {TranslateService, LangChangeEvent} from "ng2-translate";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  aboutHeading:string;
  aboutContentOne:string;
  aboutContentTwo:string;
  aboutContentThree:string;
  aboutContentFour:string;
  aboutTeam: string;
  aboutOwner: string;
  aboutOwnerText: string;
  aboutDeveloper: string;
  aboutContact: string;
  aboutItalic: string;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService) {
  }


  ngOnInit() {
    this.viewCtrl.setBackButtonText(this.translateService.instant('BACK'));
    this.initText();
    this.aboutHeading = this.translateService.instant("ABOUT_HEADING");
    this.aboutContentOne = this.translateService.instant("ABOUT_CONTENT_1");
    this.aboutContentTwo = this.translateService.instant("ABOUT_CONTENT_2");
    this.aboutContentThree = this.translateService.instant("ABOUT_CONTENT_3");
    this.aboutContentFour = this.translateService.instant("ABOUT_CONTENT_4");
    this.aboutTeam = this.translateService.instant("ABOUT_TEAM");
    this.aboutOwner = this.translateService.instant("ABOUT_OWNER");
    this.aboutOwnerText = this.translateService.instant("ABOUT_OWNER_TEXT");
    this.aboutDeveloper = this.translateService.instant("ABOUT_DEVELOPER");
    this.aboutContact = this.translateService.instant("ABOUT_CONTACT");
    this.aboutItalic = this.translateService.instant("ABOUT_ITALIC");

  }



  initText() {

  }



  close() {
    this.viewCtrl.dismiss();
  }
}
