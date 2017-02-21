import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {MeasureModal} from './measure-modal';
import {GLOBALS, COLOR, MEASURE} from "../../shared/consts/consts";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private modalCtrl: ModalController) {
  }

  modalCounter: number = 0;
  baseline: string;
  variability: string;
  decelerationsFrequency: string;
  decelerationsForm: string;
  accelerations: string;
  measures: string;
  color: string = COLOR.SECONDARY;
  canModalOpen: boolean = false;

  whatTodoText: string = GLOBALS.WHAT_TO_TODO;
  clickHere: string = "";


  openModal(characterNum) {
    if (this.baseline != null
      && this.variability != null
      && this.decelerationsFrequency != null
      && this.accelerations != null
      && this.decelerationsForm != null
      && this.measures != MEASURE.NORMAL) {
      let modal = this.modalCtrl.create(MeasureModal, {color: this.color, measure: this.measures});
      modal.present();
    }
  }

  whatToDo() {
    if (this.baseline != null
      && this.variability != null
      && this.decelerationsFrequency != null
      && this.accelerations != null
      && this.decelerationsForm != null) {

      // Case 1, if results are patological
      if (this.baseline == GLOBALS.BASELINE_1 ||
        this.variability == GLOBALS.VARIABILITY_1 ||
        this.variability == GLOBALS.VARIABILITY_2 ||
        this.variability == GLOBALS.VARIABILITY_4 ||
        this.decelerationsFrequency == GLOBALS.DECELERATIONS_FREQUENCY_2 ||
        this.decelerationsForm == GLOBALS.DECELERATIONS_FORM_1 ||
        this.decelerationsForm == GLOBALS.DECELERATIONS_FORM_3 ||
        this.decelerationsForm == GLOBALS.DECELERATIONS_FORM_5) {

        this.color = COLOR.DANGER;
        this.measures = MEASURE.FATAL;
        this.whatTodoText = "Risk for hypoxia (pathological).";
        this.clickHere = "Click here for measures";
      }

      // Case 2, if results are not that bad but bad
      else if (this.baseline == GLOBALS.BASELINE_2 ||
        this.baseline == GLOBALS.BASELINE_4 ||
        this.baseline == GLOBALS.BASELINE_5 ||
        this.variability == GLOBALS.VARIABILITY_5 ||
        this.accelerations == GLOBALS.ACCELERATIONS_2 ||
        this.decelerationsForm == GLOBALS.DECELERATIONS_FORM_6 ||
        this.decelerationsFrequency == GLOBALS.DECELERATIONS_FREQUENCY_3) {

        this.color = COLOR.WARNING;
        this.measures = MEASURE.ABNORMAL;
        this.whatTodoText = "Low risk for hypoxia (abnormal).";
        this.clickHere = "Click here for measures";
      }

      // Case 3, if restults are normal
      else {
        this.color = COLOR.SECONDARY;
        this.measures = MEASURE.NORMAL;
        this.whatTodoText = "Non ongoing hypoxia (normal).";
        this.clickHere = "No measures needed";
      }
    }
  }
}
