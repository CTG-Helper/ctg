import {Component, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ModalController } from 'ionic-angular';
import {MesureModal} from './mesure-modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnChanges {
constructor(private modalCtrl: ModalController){
}

  baseline: string;
  variability: string;
  decelarationsFrequency: string;
  decelarationsForm: string;
  accelerations: string;
  measures: string;
  color: string = "secondary";
  canModalOpen: boolean = false;

  whatTodoText: string = "Please choose some parameters";


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  openModal(characterNum) {
    if (this.canModalOpen == true){
      let modal = this.modalCtrl.create(MesureModal, {color:this.color, measure:this.measures});
      modal.present();
    }
  }

  whatToDo() {

    // Segment 1
    // x1 x2 x3 x4

    // Segment 2
    // y1 y2 y3 y4

    // Segment 3
    // z1 z2 z3 z4
    console.log("some segment button pressed");


    // Case 1, if results are patological
    if (this.baseline == "x5" ||
    this.variability == "y1" ||
    this.variability == "y2" ||
    this.variability == "y4" ||
    this.decelarationsFrequency == "z3") {
      this.canModalOpen = true
      this.color = "danger"
      this.measures = "fatal"
      this.whatTodoText = "Watch out, the baby can die. Click here for measurelist"
    }


    // Case 2, if restults are not that bad but bad
    else if (this.baseline == "x2" ||
      this.baseline == "x3" ||
      this.baseline == "x4" ||
      this.decelarationsFrequency == "z2"
    ) {
      this.canModalOpen = true
      this.color = "warning"
      this.measures = "abnormal"
      this.whatTodoText = "The results are abnormal. Click here for measurelist"
    }


    // Case 3, if restults are normal
    else {
      this.canModalOpen = true
      this.color = "secondary"
      this.measures = "normal"
      this.whatTodoText = "Loookn goooiid (normalt)! "
    }
  }
}
