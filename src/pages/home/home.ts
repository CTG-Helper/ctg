import {Component, OnInit} from '@angular/core';
import {ModalController, AlertController, ViewController} from 'ionic-angular';
import {COLOR, MEASURE, DECISION} from "../../shared/consts/globals";
import {InformationModalPage} from "../information-modal/information-modal";
import {MeasureModalPage} from "../measure-modal/measure-modal";
import * as _ from 'lodash';
import {TranslateService, LangChangeEvent} from "ng2-translate";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  baseline = "";
  variability = "";
  decelerationsFrequency = "";
  decelerationsForm = "";
  accelerations = "";
  measuresInfoText = MEASURE.NORMAL;
  decelerationStatus = "";
  moreInfoText = "More Info";
  isNormalState = true;
  color: string = COLOR.PRIMARY;
  shadowFixShow = false;
  currentLang = "";
  isEnglish = false;
  instructionColor = "white"

  measureButtonTitle: string = "CHOOSE_CONDITIONS";
  measureButtonClick: string = "";

  currentInstruction: string = "CURRENT_INSTRUCTION_VARIABILITY";

  // Arrays with the fatal conditions to check against to see if the current status is fatal.
  case_fatal_baselines = [DECISION.BASELINE_1];
  case_fatal_variabilitys = [DECISION.VARIABILITY_1, DECISION.VARIABILITY_2, DECISION.VARIABILITY_4];
  case_fatal_decelerationsFrequencies = [DECISION.DECELERATIONS_FREQUENCY_2];
  case_fatal_decelerationsForms = [DECISION.DECELERATIONS_FORM_6];

  // Arrays with the abnormal conditions to check against to see if the current status is abnormal
  case_abnormal_baselines = [DECISION.BASELINE_2, DECISION.BASELINE_4];
  case_abnormal_variabilitys = [DECISION.VARIABILITY_5, DECISION.VARIABILITY_6, DECISION.VARIABILITY_7];
  case_abnormal_decelerationsFrequencies = [DECISION.DECELERATIONS_FREQUENCY_3];
  case_abnormal_decelerationsForms = [DECISION.DECELERATIONS_FORM_1];
  case_abnormal_accelerations = [DECISION.ACCELERATIONS_2];


  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private viewCtrl: ViewController,
              private translateService: TranslateService) {
  }


  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.initLanguageValues();
    this.initTranslateSubscriber();
    this.viewCtrl.setBackButtonText(this.translateService.instant('BACK'));
  }

  openMeasureModal() {
    if (this.measuresInfoText != MEASURE.NORMAL) {
      let modal = this.modalCtrl.create(MeasureModalPage, {color: this.color, measure: this.measuresInfoText});
      modal.present();
      modal.onDidDismiss(data => {
        this.resetAlert();
      });
    }
  }

  openInfoModal(decisionName: string) {
    let modal = this.modalCtrl.create(InformationModalPage, {
      decisionName: decisionName
    });
    modal.present();
  }


  whatToDo() {
    console.log(this.variability);
    console.log(this.decelerationsForm);
    console.log(this.decelerationsFrequency);
    this.setColorToDecelerationSegments();

    // Case Fatal, if results are pathological
    if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 && this.baseline == DECISION.BASELINE_4) ||
    (this.variability == DECISION.VARIABILITY_7 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 && this.decelerationsForm == DECISION.DECELERATIONS_FORM_3) ||
    (this.decelerationsForm == DECISION.DECELERATIONS_FORM_1 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
    (this.decelerationsForm == DECISION.DECELERATIONS_FORM_5 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      _.includes(this.case_fatal_baselines, this.baseline) ||
      _.includes(this.case_fatal_variabilitys, this.variability) ||
      _.includes(this.case_fatal_decelerationsFrequencies, this.decelerationsFrequency) ||
      _.includes(this.case_fatal_decelerationsForms, this.decelerationsForm)) {
      this.isNormalState = false;
      this.color = COLOR.DANGER;
      this.measuresInfoText = MEASURE.FATAL;
      this.measureButtonTitle = "RESULTBUTTON_FATAL_TITLE";
      this.measureButtonClick = "RESULTBUTTON_FATAL_CLICK";
      console.log(this.measureButtonTitle);
      console.log(this.measureButtonClick);
    }

    // Case Abnormal, if results are not that bad but bad
    else if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      _.includes(this.case_abnormal_baselines, this.baseline) ||
      _.includes(this.case_abnormal_variabilitys, this.variability) ||
      _.includes(this.case_abnormal_accelerations, this.accelerations) ||
      _.includes(this.case_abnormal_decelerationsForms, this. decelerationsForm) ||
      _.includes(this.case_abnormal_decelerationsFrequencies,  this.decelerationsFrequency)) {
      this.isNormalState = false;
      this.color = COLOR.WARNING;
      this.measuresInfoText = MEASURE.ABNORMAL;
      this.measureButtonTitle = "RESULTBUTTON_ABNORMAL_TITLE";
      this.measureButtonClick = "RESULTBUTTON_ABNORMAL_CLICK";
    }

    // Case Normal, if results are normal
    else {
      this.color = COLOR.PRIMARY;
      this.measuresInfoText = MEASURE.NORMAL;
      this.measureButtonTitle = "RESULTBUTTON_NORMAL_TITLE";
      this.measureButtonClick = "";
      this.isNormalState = true;
      console.log(this.measureButtonTitle);
      console.log(this.measureButtonClick);
    }
    //this.lastDesicion();
    this.generateNextStep();
  }


  setColorToDecelerationSegments() {
  if ((this.baseline == DECISION.BASELINE_4 && this.decelerationsForm ==
      DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 &&
      this.baseline == DECISION.BASELINE_4) ||
      (this.variability == DECISION.VARIABILITY_7 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 &&
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_3) ||
      (this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2) ||
      this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2 ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_6 ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_1 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 ||
      (this.decelerationsForm == DECISION.DECELERATIONS_FORM_5 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3)) {
      this.decelerationStatus = "danger";
    }
    else if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      (this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 && this.decelerationsForm == DECISION.DECELERATIONS_FORM_2) ||
      (this.decelerationsForm == DECISION.DECELERATIONS_FORM_4 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_1 ||
      this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3 ||
      this.decelerationsForm == DECISION.DECELERATIONS_FORM_5 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_3) {
      this.decelerationStatus = "warning";
    }
    else {
      this.decelerationStatus = "primary";
    }
  }


  resetDesicions() {
    this.baseline = "";
    this.variability = "";
    this.decelerationsFrequency = "";
    this.decelerationsForm = "";
    this.accelerations = "";
    this.decelerationStatus = "";
    this.color = COLOR.PRIMARY;
    this.measuresInfoText = MEASURE.NORMAL;
    this.measureButtonTitle = "CHOOSE_CONDITIONS";
    this.measureButtonClick = "";
    this.isNormalState = true;
    this.currentInstruction = "CURRENT_INSTRUCTION_VARIABILITY";
  }


  lastDesicion() {
    if (this.baseline != "" &&
      this.variability != "" &&
      this.decelerationsFrequency != "" &&
      this.decelerationsForm != "" &&
      this.accelerations != "") {
      this.openMeasureModal();
    }
  }

  generateNextStep() {
    if (this.variability == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_VARIABILITY";
    } else if (this.baseline == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_BASELINE";
    } else if (this.decelerationsFrequency == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_DECELARATIONFORM";
    } else if (this.decelerationsForm == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_DECELARATIONFREQUENCY";
    } else if (this.accelerations == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_ACCELARATIONS";
    }

    if (this.measuresInfoText == "fatal") {
      this.currentInstruction = "CURRENT_INSTRUCTION_FATAL";
    }

    if ((this.baseline != "" &&
      this.variability != "" &&
      this.decelerationsFrequency != "" &&
      this.decelerationsForm != "" &&
      this.accelerations != "") &&
      this.measuresInfoText == "abnormal") {
      this.currentInstruction = "CURRENT_INSTRUCTION_FINISHED_ABNORMAL";
    }

    else if ((this.baseline != "" &&
      this.variability != "" &&
      this.decelerationsFrequency != "" &&
      this.decelerationsForm != "" &&
      this.accelerations != "") &&
      this.measuresInfoText == "fatal") {
      this.currentInstruction = "CURRENT_INSTRUCTION_FATAL";
    }

    else if ((this.baseline != "" &&
      this.variability != "" &&
      this.decelerationsFrequency != "" &&
      this.decelerationsForm != "" &&
      this.accelerations != "") &&
      this.measuresInfoText == "normal") {
      this.currentInstruction = "CURRENT_INSTRUCTION_FINISHED_NORMAL";
    }
  }


  initTranslateSubscriber() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initLanguageValues();
    });
  }

  initLanguageValues() {
    this.yesText = this.translateService.instant("YES");
    this.cancelText = this.translateService.instant("CANCEL");
    this.alertMessage = this.translateService.instant("DO_YOU_WANT_TO_RESET_FORM");
    this.alertTitle = this.translateService.instant("RESET_FORM");
  }



  yesText = "";
  cancelText = "";
  alertMessage = "";
  alertTitle = "";

  resetAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      message: this.alertMessage,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel'
        },
        {
          text: this.yesText,
          handler: () => {
            this.resetDesicions();
          }
        }
      ]
    });
    alert.present();
  }


  onLanguageChange() {
    // Toggles between true or false when pressed;
    this.isEnglish = !this.isEnglish;
    if (this.isEnglish) {
      this.translateService.use('en');
    } else {
      this.translateService.use('sv');
    }
  }

  ionViewWillEnter() {
    console.log("Life Cycle @  ionViewWillEnter");
    this.updateFlagFromChild();


  }

  ionViewDidEnter() {
    console.log("Life Cycle @  ionViewDidEnter");
    this.shadowFixShow = true;
  }

  ionViewWillLeave() {
    console.log("Life Cycle @  ionWillLeave");
    this.shadowFixShow = false;
  }

  updateFlagFromChild() {
    this.isEnglish = this.translateService.currentLang == 'en';
  }


}
