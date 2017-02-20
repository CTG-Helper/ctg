import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MeasureModal} from '../pages/home/measure-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MeasureModal
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode:"ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MeasureModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
