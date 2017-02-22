import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {COLOR, MEASURE, TODO, DECISION} from "../../shared/consts/globals";
import {InformationModalPage} from "../information-modal/information-modal";
import {MeasureModalPage} from "../measure-modal/measure-modal";
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  baseline: string;
  variability: string;
  decelerationsFrequency: string;
  decelerationsForm: string;
  accelerations: string;
  measuresInfoText: string;
  clickHere: string;
  color: string = COLOR.PRIMARY;
  whatTodoText: string = TODO.CHOOSE_CONDITIONS;
  decelerationStatus: string;


  constructor(private modalCtrl: ModalController) {
  }


  // Arrays with the fatal conditions to check against to see if the current status is fatal.
  case_fatal_baselines = [DECISION.BASELINE_1];
  case_fatal_variabilitys = [DECISION.VARIABILITY_1, DECISION.VARIABILITY_2, DECISION.VARIABILITY_4];
  case_fatal_decelerationsFrequencies = [DECISION.DECELERATIONS_FREQUENCY_2];
  case_fatal_decelerationsForms = [DECISION.DECELERATIONS_FORM_1, DECISION.DECELERATIONS_FORM_5];

  // Arrays with the abnormal conditions to check against to see if the current status is abnormal
  case_abnormal_baselines = [DECISION.BASELINE_2, DECISION.BASELINE_4];
  case_abnormal_variabilitys = [DECISION.VARIABILITY_5, DECISION.VARIABILITY_6];
  case_abnormal_decelerationsFrequencies = [DECISION.DECELERATIONS_FREQUENCY_3];
  case_abnormal_accelerations = [DECISION.ACCELERATIONS_2];


  whatToDo() {
    this.setColorToDecelerationSegments();

    // Case Fatal, if results are pathological
    if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2) ||
      _.includes(this.case_fatal_baselines, this.baseline) ||
      _.includes(this.case_fatal_variabilitys, this.variability) ||
      _.includes(this.case_fatal_decelerationsFrequencies, this.decelerationsFrequency) ||
      _.includes(this.case_fatal_decelerationsForms, this.decelerationsForm)) {

      this.color = COLOR.DANGER;
      this.measuresInfoText = MEASURE.FATAL;
      this.whatTodoText = TODO.RISK_HYPOXIA_PATHOLOGICAL;
      this.clickHere = "Click here for measuresInfoText";
    }

    // Case Abnormal, if results are not that bad but bad
    else if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      _.includes(this.case_abnormal_baselines, this.baseline) ||
      _.includes(this.case_abnormal_variabilitys, this.variability) ||
      _.includes(this.case_abnormal_accelerations, this.accelerations) ||
      _.includes(this.case_abnormal_decelerationsFrequencies, this.decelerationsFrequency)) {
      this.color = COLOR.WARNING;
      this.measuresInfoText = MEASURE.ABNORMAL;
      this.whatTodoText = TODO.LOW_RISK_HYPOXIA_ABNORMAL;
      this.clickHere = "Click here for measuresInfoText";
    }

    // Case Normal, if results are normal
    else {
      this.color = COLOR.PRIMARY;
      this.measuresInfoText = MEASURE.NORMAL;
      this.whatTodoText = TODO.NO_HYPOXIA;
      this.clickHere = "Continue with standard procedures";
    }
  }


  openMeasureModal() {
    if (this.measuresInfoText != MEASURE.NORMAL) {
      let modal = this.modalCtrl.create(MeasureModalPage, {color: this.color, measure: this.measuresInfoText});
      modal.present();
    }
  }

  openInfoModal(decisionName: string) {
    let modal = this.modalCtrl.create(InformationModalPage, {decisionName: decisionName});
    modal.present();
  }


  setColorToDecelerationSegments() {
    if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2) ||
      this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2 ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_5 ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_1) {
      this.decelerationStatus = "danger";
    }
    else if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      (this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 && this.decelerationsForm == DECISION.DECELERATIONS_FORM_2) ||
      (this.decelerationsForm == DECISION.DECELERATIONS_FORM_4 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3)) {
      this.decelerationStatus = "warning";
    }
    else {
      this.decelerationStatus = "primary";
    }
  }


}
