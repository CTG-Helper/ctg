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
  segmentText_1:string = "";
  segmentText_2:string = "";
  segmentText_3:string = "";
  segmentText_4:string = "";
  segmentText_5:string = "";
  segmentText_6:string = "";
  segmentText_7:string = "";

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private translateService: TranslateService) {
  }


  ngOnInit() {
    let decision = this.navParams.get('decisionName');
    this.showInformation(decision);
  }


  showInformation(descision: string) {
    switch (descision) {
      case DECISION_TYPE.BASELINE:
        this.title = "BASELINE";
        this.informationText = DECISION_INFORMATION.BASELINE_INFO;
        this.segmentText_1 = this.translateService.instant("BASELINE_SEGMENT_INFO_1");
        this.segmentText_2 = this.translateService.instant("BASELINE_SEGMENT_INFO_2");
        this.segmentText_3 = this.translateService.instant("BASELINE_SEGMENT_INFO_3");
        this.segmentText_4 = this.translateService.instant("BASELINE_SEGMENT_INFO_4");
        break;
      case DECISION_TYPE.VARIABILITY:
        this.title = "VARIABILITY";
        this.informationText = DECISION_INFORMATION.VARIABILITY_INFO;
        this.segmentText_1 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_1");
        this.segmentText_2 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_2");
        this.segmentText_3 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_3");
        this.segmentText_4 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_4");
        this.segmentText_5 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_5");
        this.segmentText_6 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_6");
        this.segmentText_7 = this.translateService.instant("VARIABILITY_SEGMENT_INFO_7");
        break;
      case DECISION_TYPE.DECELERATIONS_FREQUENCY:
        this.title = "DECELERATION_FREQUENCY";
        this.informationText = DECISION_INFORMATION.DECELERATION_FREQUENCY_INFO;
        this.segmentText_1 = this.translateService.instant("DECELERATION_FREQUENCY_SEGMENT_INFO_1");
        this.segmentText_2 = this.translateService.instant("DECELERATION_FREQUENCY_SEGMENT_INFO_2");
        this.segmentText_3 = this.translateService.instant("DECELERATION_FREQUENCY_SEGMENT_INFO_3");
        break;
      case DECISION_TYPE.DECELERATIONS_FORM:
        this.title = "DECELERATION_FORM";
        this.informationText = DECISION_INFORMATION.DECELERATION_FORM_INFO;
        this.segmentText_1 = this.translateService.instant("DECELERATION_FORM_SEGMENT_INFO_1");
        this.segmentText_2 = this.translateService.instant("DECELERATION_FORM_SEGMENT_INFO_2");
        this.segmentText_3 = this.translateService.instant("DECELERATION_FORM_SEGMENT_INFO_3");
        this.segmentText_4 = this.translateService.instant("DECELERATION_FORM_SEGMENT_INFO_4");
        this.segmentText_5 = this.translateService.instant("DECELERATION_FORM_SEGMENT_INFO_5");
        break;
      case DECISION_TYPE.ACCELERATIONS:
        this.title = "ACCELERATIONS";
        this.informationText = DECISION_INFORMATION.ACCELERATION_INFO;
        this.segmentText_1 = this.translateService.instant("ACCELERATION_SEGMENT_INFO_1");
        this.segmentText_2 = this.translateService.instant("ACCELERATION_SEGMENT_INFO_2");
        break;
      default: this.informationText = "wops something went wrong"
    }
  }


  close() {
    this.viewCtrl.dismiss();
  }

}
