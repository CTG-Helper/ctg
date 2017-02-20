import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'mesure-modal',
  templateUrl: 'mesure-modal.html'
})
export class MesureModal {

color:string;
measures:string;
measureList = [];

  constructor(private navParams: NavParams){
    this.color = this.navParams.get("color");
    this.measures = this.navParams.get("measure");

    if (this.measures == "normal"){
      this.measureList[0] = {measure:"measure 3"};
      this.measureList[1] = {measure:"measure 4"};
    }

    else if (this.measures == "abnormal"){
      this.measureList[0] = {measure:"measure 1"};
      this.measureList[1] = {measure:"measure 2"};
    }

    else if (this.measures == "fatal"){
      this.measureList[0] = {measure:"measure 5"};
      this.measureList[1] = {measure:"measure 6"};
    }

    else {
      let measureList = [
        { measure: 'Jilles'},
        { measure: 'Todd'},
        { measure: 'Lisa'}
      ];
    }
  }
}
