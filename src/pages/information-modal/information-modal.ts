import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {DECISION_TYPE, DECISION_INFORMATION} from "../../shared/consts/globals";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-information-modal',
  templateUrl: 'information-modal.html'
})

export class InformationModalPage implements OnInit {
  informationText: string;
  title: string;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private translateService: TranslateService) {
  }


  ngOnInit() {
    let decision = this.navParams.get('decisionName');
    let language = this.navParams.get('language');
    this.translateService.use(language);
    this.showInformation(decision);
  }


  showInformation(descision: string) {
    switch (descision) {
      case DECISION_TYPE.BASELINE:
        this.title = "BASELINE";
        this.informationText = DECISION_INFORMATION.BASELINE_INFO;
        break;
      case DECISION_TYPE.VARIABILITY:
        this.title = "VARIABILITY";
        this.informationText = DECISION_INFORMATION.VARIABILITY_INFO;
        break;
      case DECISION_TYPE.DECELERATIONS_FORM:
        this.title = "DECELERATION_FORM";
        this.informationText = DECISION_INFORMATION.DECELERATION_FORM_INFO;
        break;
      case DECISION_TYPE.DECELERATIONS_FREQUENCY:
        this.title = "DECELERATION_FREQUENCY";
        this.informationText = DECISION_INFORMATION.DECELERATION_FREQUENCY_INFO;
        break;
      case DECISION_TYPE.ACCELERATIONS:
        this.title = "ACCELERATIONS";
        this.informationText = DECISION_INFORMATION.ACCELERATION_INFO;
        break;
      default: this.informationText = "wops something went wrong"
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }

}
