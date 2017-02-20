import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MesureModal} from '../pages/home/mesure-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MesureModal
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode:"ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MesureModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
