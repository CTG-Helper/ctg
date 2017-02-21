import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {MEASURE} from "../../shared/consts/globals";

@Component({
  selector: 'measure-modal',
  templateUrl: 'measure-modal.html'
})

export class MeasureModalPage implements OnInit {

  color: string;
  measures: string;
  interpretation: string;
  measureList: Object[] = [];

  constructor(private navParams: NavParams, public viewCtrl: ViewController) {
  }


  ngOnInit() {
    this.color = this.navParams.get("color");
    this.measures = this.navParams.get("measure");

    if (this.measures == MEASURE.NORMAL) {
      //If measuresInfoText are to be applied to a normal state do it here!
    }

    else if (this.measures == MEASURE.ABNORMAL) {
      this.interpretation = "Low risk for hypoxia";
      this.measureList[0] = {measure: "Correct reversible causes"};
      this.measureList[1] = {measure: "Continue CTG"};
      this.measureList[2] = {measure: "Consider stimulationtest/scalpbloodtest"};
    }

    else if (this.measures == MEASURE.FATAL) {
      this.interpretation = "Moderate/high risk for hypoxia";
      this.measureList[0] = {measure: "Correct reversible causes"};
      this.measureList[1] = {measure: "Perform stimulationtest/scalpbloodtest or deliver baby"};
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
