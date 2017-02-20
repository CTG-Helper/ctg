import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'mesure-modal',
  templateUrl: 'mesure-modal.html'
})
export class MesureModal {

color:string;
measures:string;
Interpretation:string;
measureList = [];

  constructor(private navParams: NavParams, public View: ViewController){

    this.color = this.navParams.get("color");
    this.measures = this.navParams.get("measure");

    if (this.measures == "normal"){
      //If measures are to be applied to a normal state do it here!
    }

    else if (this.measures == "abnormal"){
      this.Interpretation = "Low risk for hypoxia";
      this.measureList[0] = {measure:"Correct reversible causes"};
      this.measureList[1] = {measure:"Continue CTG"};
      this.measureList[2] = {measure:"Consider stimulationtest/scalpbloodtest"};
    }

    else if (this.measures == "fatal"){
      this.Interpretation = "Moderate/high risk for hypoxia";
      this.measureList[0] = {measure:"Correct reversible causes"};
      this.measureList[1] = {measure:"Perform stimulationtest/scalpbloodtest or deliver baby"};
    }

    else {
      let measureList = [
        { measure: 'Jilles'},
        { measure: 'Todd'},
        { measure: 'Lisa'}
      ];
    }
  }

  close(){
    this.View.dismiss();
  }
}
