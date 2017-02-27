import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MeasureModalPage} from "../pages/measure-modal/measure-modal";
import {InformationModalPage} from "../pages/information-modal/information-modal";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {Http} from "@angular/http";
import { InstructionsPage} from "../pages/instructions/instructions";
import {StartPage} from "../pages/start/start";
import {AboutPage} from "../pages/about/about";


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    InstructionsPage,
    AboutPage,
    MeasureModalPage,
    InformationModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode:"ios"}),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    AboutPage,
    InstructionsPage,
    MeasureModalPage,
    InformationModalPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
