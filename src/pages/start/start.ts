import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  ctgPage = HomePage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}






}
