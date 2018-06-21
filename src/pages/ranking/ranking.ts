import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { User } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
    mUsers : Array<User> = [];
  ranking_arr = [];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public storage : Storage) {
  }

  ionViewDidLoad() {
    this.loadData();
    // this.storage.get("high_score").then(val=>{
    //   if(val){
    //     this.ranking_arr = val;
    //   }
    // })
    // console.log('ionViewDidLoad RankingPage');
  }
  loadData(){
    firebase.firestore().collection('users').orderBy('score','desc').get().then((snap)=>{
     this.mUsers = [];
      snap.docs.forEach(doc =>{
        if(doc.exists){
          let docData = doc.data();
          let userRank = new User(docData['id'], docData['name'], docData['avatar'], docData['score']);
          this.mUsers.push(userRank);
        }
      });
    });
  }

}
