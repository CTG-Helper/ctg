import {Component, OnInit} from '@angular/core';
import {ModalController, AlertController} from 'ionic-angular';
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

  measureButtonTitle: string = "CHOOSE_CONDITIONS";
  measureButtonClick: string = "";

  currentInstruction: string = "CURRENT_INSTRUCTION_VARIABILITY";

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


  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.initTranslateSubscriber();

    // just to invoke changes in the initTranslateSubscruber
    this.translateService.use('sv');
  }


  shadowFixShow = false;



  ionViewDidEnter() {
    console.log("Life Cycle @  ionViewWillEnter");
    this.shadowFixShow = true;

  }

  ionViewWillLeave() {
    this.shadowFixShow = false;

    console.log("Life Cycle @  ionWillLeave");
  }


  whatToDo() {
    this.setColorToDecelerationSegments();

    // Case Fatal, if results are pathological
    if ((this.decelerationsForm == DECISION.DECELERATIONS_FORM_3 && this.decelerationsFrequency == DECISION.DECELERATIONS_FREQUENCY_2) ||
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
      _.includes(this.case_abnormal_decelerationsFrequencies, this.decelerationsFrequency)) {
      this.isNormalState = false;
      this.color = COLOR.WARNING;
      this.measuresInfoText = MEASURE.ABNORMAL;
      this.measureButtonTitle = "RESULTBUTTON_ABNORMAL_TITLE";
      this.measureButtonClick = "RESULTBUTTON_ABNORMAL_CLICK";
      console.log(this.measureButtonTitle);
      console.log(this.measureButtonClick);
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


  openMeasureModal() {
    if (this.measuresInfoText != MEASURE.NORMAL) {
      let modal = this.modalCtrl.create(MeasureModalPage, {color: this.color, measure: this.measuresInfoText, language: this.selectedLanguage});
      modal.present();
      modal.onDidDismiss(data => {
        this.resetAlert();
      });
    }
  }

  openInfoModal(decisionName: string) {
    let modal = this.modalCtrl.create(InformationModalPage, {
      decisionName: decisionName,
      language: this.selectedLanguage
    });
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
      this.currentInstruction = "CURRENT_INSTRUCTION_DECELARATIONFREQUENCY";
    } else if (this.decelerationsForm == "") {
      this.currentInstruction = "CURRENT_INSTRUCTION_DECELARATIONFORM";
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
      this.yesText =  this.translateService.instant("YES");
      this.cancelText =  this.translateService.instant("CANCEL");
      this.alertMessage =  this.translateService.instant("DO_YOU_WANT_TO_RESET_FORM");
      this.alertTitle =  this.translateService.instant("RESET_FORM");
    });
  }

  yesText = "Yes";
  cancelText = "Cancel";
  alertMessage = "Do you want to reset the form?";
  alertTitle = "Reset form";

  resetAlert() {

    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      message: this.alertMessage,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel',
          handler: () => {

          }
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


  isEnglish = false;
  selectedLanguage = "sv";

  onLanguageChange() {
    // Toggles between true or false when pressed;
    this.isEnglish = !this.isEnglish;

    if (this.isEnglish) {
      this.selectedLanguage = 'en';
    } else {
      this.selectedLanguage = 'sv';
    }
    // Sets the current language
    this.translateService.use(this.selectedLanguage);
  }

}
