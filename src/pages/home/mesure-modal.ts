import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'mesure-modal.html'
})
export class MesureModal {

color:string;
measures:string;

  constructor(private navParams: NavParams){
    this.color = this.navParams.get("color");
    this.measures = this.navParams.get("measure");

  }
  printMeasures(){
    
  }
}
