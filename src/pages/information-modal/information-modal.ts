import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {DECISION_TYPE, DECISION_INFORMATION} from "../../shared/consts/globals";

@Component({
  selector: 'page-information-modal',
  templateUrl: 'information-modal.html'
})

export class InformationModalPage implements OnInit {
  informationText: string;
  title: string;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
  }


  ngOnInit() {
    let decision = this.navParams.get('decisionName');
    this.showInformation(decision);
  }


  showInformation(descision: string) {
    switch (descision) {
      case DECISION_TYPE.BASELINE:
        this.title = "Baseline";
        this.informationText = DECISION_INFORMATION.BASELINE;
        break;
      case DECISION_TYPE.VARIABILITY:
        this.title = "Variability";
        this.informationText = DECISION_INFORMATION.VARIABILITY;
        break;
      case DECISION_TYPE.DECELERATIONS_FORM:
        this.title = "Decelerations form";
        this.informationText = DECISION_INFORMATION.DECELERATION_FORM;
        break;
      case DECISION_TYPE.DECELERATIONS_FREQUENCY:
        this.title = "Decelerations Frequency";
        this.informationText = DECISION_INFORMATION.DECELERATION_FREQUENCY;
        break;
      case DECISION_TYPE.ACCELERATIONS:
        this.title = "Accelerations";
        this.informationText = DECISION_INFORMATION.ACCELERATION;
        break;
      default: this.informationText = "wops something went wrong"
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }

}
