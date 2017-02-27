import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'instructions',
  templateUrl: 'instructions.html'
})

export class InstructionsPage implements OnInit {


  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService,) {
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
