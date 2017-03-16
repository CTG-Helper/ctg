import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'instructions',
  templateUrl: 'instructions.html'
})

export class InstructionsPage implements OnInit {
  menuHeading:string;
  ctgHeading:string;
  instructionHeader: string;
  instructionText: string;
  instructionCtgText: string;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private translateService: TranslateService,) {
  }


  ngOnInit() {
    this.viewCtrl.setBackButtonText(this.translateService.instant('BACK'));
    this.instructionHeader = this.translateService.instant("INSTRUCTION_HEADER");
    this.instructionText = this.translateService.instant("INSTRUCTION_TEXT");
    this.instructionCtgText = this.translateService.instant("INSTRUCTION_CTG_TEXT");
    this.menuHeading = this.translateService.instant("MENU_HEADING");
    this.ctgHeading = this.translateService.instant("CTG_HEADING");
  }


  close() {
    this.viewCtrl.dismiss();
  }
}
