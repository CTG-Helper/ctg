import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {MeasureModal} from './measure-modal';


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
  decelarationsFrequency: string;
  decelarationsForm: string;
  accelerations: string;
  measures: string;
  color: string = "secondary";
  canModalOpen: boolean = false;

  whatTodoText: string = "Please choose the conditions above to get appropriate measures.";
  clickHere: string = "";


  openModal(characterNum) {
    if (this.baseline != null
      && this.variability != null
      && this.decelarationsFrequency != null
      && this.accelerations != null
      && this.decelarationsForm != null
      && this.measures != "normal") {
      let modal = this.modalCtrl.create(MeasureModal, {color: this.color, measure: this.measures});
      modal.present();
    }
  }

  whatToDo() {
    if (this.baseline != null
      && this.variability != null
      && this.decelarationsFrequency != null
      && this.accelerations != null
      && this.decelarationsForm != null) {

      // Case 1, if results are patological
      if (this.baseline == "baseline1" ||
        this.variability == "variability1" ||
        this.variability == "variability2" ||
        this.variability == "variability4" ||
        this.decelarationsFrequency == "decelarationsFrequency2" ||
        this.decelarationsForm == "decelarationsForm1" ||
        this.decelarationsForm == "decelarationsForm3" ||
        this.decelarationsForm == "decelarationsForm5") {

        this.color = "danger";
        this.measures = "fatal";
        this.whatTodoText = "Risk for hypoxia (pathological).";
        this.clickHere = "Click here for measures";
      }

      // Case 2, if restults are not that bad but bad
      else if (this.baseline == "baseline2" ||
        this.baseline == "baseline4" ||
        this.baseline == "baseline5" ||
        this.variability == "variability5" ||
        this.accelerations == "accelerations2" ||
        this.decelarationsForm == "decelarationsForm6" ||
        this.decelarationsFrequency == "decelarationsFrequency3") {
        this.color = "warning";
        this.measures = "abnormal";
        this.whatTodoText = "Low risk for hypoxia (abnormal).";
        this.clickHere = "Click here for measures";
      }

      // Case 3, if restults are normal
      else {
        this.color = "secondary";
        this.measures = "normal";
        this.whatTodoText = "Non ongoing hypoxia (normal).";
        this.clickHere = "No measures needed";
      }
    }
  }
}
