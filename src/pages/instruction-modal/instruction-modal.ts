import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'measure-modal',
  templateUrl: 'measure-modal.html'
})

export class InstructionModalPage implements OnInit {


  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService) {
  }


  ngOnInit() {
    let language = this.navParams.get('language');
    this.translateService.use(language);

    this.initText();
  }

  initText() {

  }


  close() {
    this.viewCtrl.dismiss();
  }
}
