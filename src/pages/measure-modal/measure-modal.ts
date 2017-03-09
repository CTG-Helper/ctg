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
    this.initText();
  }

  initText() {
    if (this.measures == MEASURE.NORMAL) {
      //If measuresInfoText are to be applied to a normal state do it here!
    }

    else if (this.measures == MEASURE.ABNORMAL) {
      this.interpretation = "ABNORMAL_INTERPRETATION";
      this.measureList = [
        "ABNORMAL_MEASURE_1",
        "ABNORMAL_MEASURE_2",
        "ABNORMAL_MEASURE_3"];
    }

    else if (this.measures == MEASURE.FATAL) {
      this.interpretation = "FATAL_INTERPRETATION";
      this.measureList = [
        "FATAL_MEASURE_1",
        "FATAL_MEASURE_2",
        "FATAL_MEASURE_3",
        "FATAL_MEASURE_4",
        "FATAL_MEASURE_5"];
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }
}
