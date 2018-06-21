import { Component, state } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import firebase from 'firebase';
import { createElement } from '@angular/core/src/view/element';
import { Observable } from 'rxjs/Observable';
import { Media, MediaObject } from '@ionic-native/media';
import { Http } from '@angular/http';
import { log } from '@firebase/database/dist/src/core/util/util';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  db = firebase.firestore();
  data: any;
  items : any = [];
  troll_face : string = "";
  random : number = Math.floor(Math.random() * 19);

  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media,
    private nativeAudio: NativeAudio
    ) {
      // this.deviceAccounts.get()
      // .then(accounts => console.log(accounts))
      // .catch(error => console.error(error));
    // const firestore = firebase.firestore();
    // const settings = {/* your settings... */ timestampsInSnapshots: true};
    // firestore.settings(settings);
  }

  ionViewDidLoad(){  
    const file: MediaObject = this.media.create('assets/1.mp3');
    file.play();
    console.log("alo");

    this.nativeAudio.preloadSimple('uniqueId1', '../assets/1.mp3').then(this.onSuccess, this.onError);
    

    this.troll_face = "assets/icon/".concat(this.random.toString()).concat(".png")
    this._LoadData();
  }

  onSuccess(){
    this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
  }

  onError(){
    console.log("rip");
    
  }
  
  public _LoadData(){
    if(this.items.length == 0){
      this.getCollection("/demo").get().then(snapshot=>{
        if(snapshot){
          var i = 0;
          snapshot.forEach(doc=>{
            this.items[i] = doc.data();
            i++;
          })
        }        
      })    
    }  
  }

  compare(a: any,b: any) {
    if (Number(a.id) < Number(b.id))
      return -1;
    if (Number(a.id)> Number(b.id))
      return 1;
    return 0;
  }

  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // không tồn tại tính chất trên cả hai object
          return 0; 
      }
    
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
    
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
   }


  //  upLoadData(){
  //   var name = "data";
  //   var number : number = 0;
  //   this.http.get('assets/tb_dvhainaohoingu.json').map(res => { return res.json()}).subscribe(parent=>{

  //     for(var i = 0 ; i < parent.length ; i ++){
  //       this.db.collection('demo').doc(String(number)).set(parent[i]);
  //       number ++;
  //     }

  //     this.getCollection("/demo").get().then(snapshot=>{
  //       var i = 0;
  //       snapshot.forEach(doc=>{
  //         // console.log(doc.id);
  //         this.items[i] = doc.data();
  //         i++;
  //       })   
  //     })
  //     console.log("firebase: ", this.items);
  //   })
  //  }

  // load(): any {
  //   // neu co data roi
  //   if (this.data) {
  //     return Observable.of(this.data);
  //   } else {
  //     // lay data tu file data.json
  //     return this.http.get('assets/tb_dvhainaohoingu.json');     
  //   }
  // }

   getRank(){
     this.navCtrl.push("RankingPage")
   }

  getCollection(path: string){
    return firebase.firestore().collection(path);
  }

  play(){
    this.navCtrl.push("GamePage"  , {array : this.items});    
  }

  setting(){
    this.navCtrl.push("SettingPage");
  }

  changeFace(){
    let random : number = Math.floor(Math.random() * 19);
    this.troll_face = "assets/icon/".concat(random.toString()).concat(".png");
    let element = document.getElementById("image");
    element.setAttribute("src", this.troll_face);
  }
}
