import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-change-username',
  templateUrl: 'change-username.html',
})
export class ChangeUsernamePage {
  current_name : string = "";
  device_id : string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public device : Device
    ) {}

  ionViewDidLoad() {
    this.device_id = this.device.uuid;
    firebase.firestore().collection("users").get().then(snapshot=>{
      snapshot.forEach(snap => {
        if(snap.id === this.device_id){
          this.current_name = snap.get('name');
        }
      });
    })
   
  }

}
