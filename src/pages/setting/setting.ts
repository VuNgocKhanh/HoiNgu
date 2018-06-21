import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})

export class SettingPage {
  
  constructor(public navCtrl: NavController,public navParams: NavParams){}

  ionViewDidLoad() {}

  addQuestion(){
    this.navCtrl.push("AddQuestionPage");
  }
  changeName(){
    this.navCtrl.push("ChangeUsernamePage");
  }
}
