import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { Device } from '@ionic-native/device';
import {Info} from  '../../interface/info';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Form } from '@angular/forms/src/directives/form_interface';


@IonicPage()
@Component({
  selector: 'page-add-question',
  templateUrl: 'add-question.html',
})
export class AddQuestionPage {
  db = firebase.firestore();
  number :number = 0;
  id_device: string = "";
  current_name : string = "";
  info : Info = {id : 0,  result_a : "", result_b : "", result_c : "", result_d : "", question : "", correct_result : "", explain_a: "", explain_b: "", explain_c: "", explain_d: "", nickname: ""};
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public device : Device,
     public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.id_device = this.device.uuid;
    this.db.collection("users").get().then(snapshot=>{
      snapshot.forEach(snap => {
        if(snap.id === "test"){
          this.current_name = snap.get('name');
        }
      });
    })
    this.db.collection("/demo").get().then(snapshot=>{
      snapshot.forEach(element => {
        this.number++;
      });
    })
    console.log('ionViewDidLoad AddQuestionPage');
  }

  reset(){
    this.info = {id : 0,  result_a : "", result_b : "", result_c : "", result_d : "", question : "", correct_result : "", explain_a: "", explain_b: "", explain_c: "", explain_d: "", nickname: ""};
  }

  addToFirebase(ngForm : Form){
    this.number ++;
    var new_data = {
      _id: this.number,
      a: this.info.result_a,
      b: this.info.result_b,
      c: this.info.result_c,
      d: this.info.result_d,
      cauhoi : this.info.question,
      dapandung : this.info.correct_result,
      gt_a : this.info.explain_a,
      gt_b : this.info.explain_b,
      gt_c : this.info.explain_c,
      dt_d : this.info.explain_d,
      nickname : this.info.nickname
    };
    let doc = "data";
    let setData = this.db.collection('demo').doc(doc.concat(this.number.toString())).set(new_data);

    // this.reset();
    let toast = this.toastCtrl.create({
      message : "Thêm câu hỏi thành công",
      duration : 3000
    });

    toast.dismiss();
    toast.present();
    this.navCtrl.pop();
  }

}
