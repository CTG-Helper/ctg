import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MeasureModalPage} from "../pages/measure-modal/measure-modal";
import {InformationModalPage} from "../pages/information-modal/information-modal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MeasureModalPage,
    InformationModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode:"ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MeasureModalPage,
    InformationModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
