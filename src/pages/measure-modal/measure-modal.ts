import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {MEASURE} from "../../shared/consts/globals";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'measure-modal',
  templateUrl: 'measure-modal.html'
})

export class MeasureModalPage implements OnInit {

  color: string;
  measures: string;
  interpretation: string;
  measureList: Object[] = [];

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService) {
  }


  ngOnInit() {
    this.color = this.navParams.get("color");
    this.measures = this.navParams.get("measure");
    let language = this.navParams.get('language');
    this.translateService.use(language);

    this.initText();
  }

  initText() {
    if (this.measures == MEASURE.NORMAL) {
      //If measuresInfoText are to be applied to a normal state do it here!
    }

    else if (this.measures == MEASURE.ABNORMAL) {
      this.interpretation = "ABNORMAL_INTERPRETATION";
      this.measureList = [
        "ABNORMAL_CORRECT_REVERSIBLE_CAUSES",
        "ABNORMAL_CONTINUE_CTG",
        "ABNORMAL_CONSIDER_STIMULATIONSTEST_SCALP_BLOODTEST"];
    }

    else if (this.measures == MEASURE.FATAL) {
      this.interpretation = "FATAL_INTERPRETATION";
      this.measureList = [
        "FATAL_CORRECT_REVERSIBLE_CAUSES",
        "FATAL_PERFORM_STIMULATION_TEST_SCALP_TEST_OR_GIVE_BIRTH"];
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }
}
