import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../../pages/home/home';
import { NativeAudio } from '@ionic-native/native-audio';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { DataProvider, User } from '../../providers/data/data';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})


export class GamePage {
  count: number = 0;
  data: any = []
  random: number = Math.floor(Math.random() * 500);
  number_question: number = 1;
  user: string = "";
  turn: number = 3;
  default: boolean = true;
  correct: boolean = false;
  wrong: boolean = false;
  result: string = "";
  explain: string = "";
  troll_face: string = "";
  click: number = 0;
  random_image: number = Math.floor(Math.random() * 18);
  high_score : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeAudio: NativeAudio, 
    private uniqueDeviceID: UniqueDeviceID,
    public storage : Storage,
    public dataProvider : DataProvider,
    public device : Device
  ) 
  {
    console.log("Name device: ", this.device.manufacturer);
    console.log("ID device: ", this.device.uuid);
    
    
  }
  
  getCollection(path: string) {
    return firebase.firestore().collection(path);
  }

  //Load data
  ionViewDidLoad() {
    this.troll_face = "assets/icon/".concat(this.random_image.toString()).concat(".png");
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/1.mp3').then(this.onSuccess, this.onError);
  }

  onSuccess() {
    // this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
    console.log("success");
  }

  onError() {
    console.log("error");
  }

  turnSound() {
    this.count++;
    var a = document.getElementById("sound").getAttribute("src");
    if (this.count % 2 == 0) {
      document.getElementById("sound").setAttribute("src", "assets/icon/bt_soundon.png");
    } else if (this.count % 2 != 0) {
      document.getElementById("sound").setAttribute("src", "assets/icon/bt_soundoff.png");
    }
  }

  checkAnswer(result: String) {
    if (result == this.navParams.get('array')[this.random].dapandung) {
      // this.click = 0;
      let random_image: number = Math.floor(Math.random() * 18);
      this.troll_face = "assets/icon/".concat(random_image.toString()).concat(".png");
      this.correct = true;
      if (this.navParams.get('array')[this.random].dapandung == "a") {
        this.explain = this.navParams.get('array')[this.random].gt_a;
      }
      if (this.navParams.get('array')[this.random].dapandung == "b") {
        this.explain = this.navParams.get('array')[this.random].gt_b;
      }
      if (this.navParams.get('array')[this.random].dapandung == "c") {
        this.explain = this.navParams.get('array')[this.random].gt_c;
      }
      if (this.navParams.get('array')[this.random].dapandung == "d") {
        this.explain = this.navParams.get('array')[this.random].dt_d;
      }

    } else {
      let turn = document.getElementById("turn");
      this.click++;
      switch (this.click) {
        case 1:
          turn.style.color = "orange";
          break;

        case 2:
          turn.style.color = "red";
          break;

        case 3:
          turn.style.color = "red";
          break;
        default:
          break;
      }

      if (this.turn > 0) {
        this.turn -= 1;
      }
      if (this.turn == 0) {
        let random_image: number = Math.floor(Math.random() * 18);
        this.troll_face = "assets/icon/".concat(random_image.toString()).concat(".png");
        if (this.navParams.get('array')[this.random].dapandung == "a") {
          this.result = this.navParams.get('array')[this.random].a;
        }
        if (this.navParams.get('array')[this.random].dapandung == "b") {
          this.result = this.navParams.get('array')[this.random].b;
        }
        if (this.navParams.get('array')[this.random].dapandung == "c") {
          this.result = this.navParams.get('array')[this.random].c;
        }
        if (this.navParams.get('array')[this.random].dapandung == "d") {
          this.result = this.navParams.get('array')[this.random].d;
        }
        this.turn = 0;
        this.wrong = true;

        // Create object data
        let ranking = new User("" ,"", "", 0);
        ranking.name = this.device.manufacturer;
        ranking.score = this.number_question - 1;
        ranking.id = this.device.uuid;

        let ranking_data = {
          id: ranking.id,
          name: ranking.name,
          avatar: "",
          score: ranking.score
        }
        this.dataProvider.addUser(ranking_data);
        this.dataProvider.updateScore(ranking.score, ranking.id);

        // Get high score

        firebase.firestore().collection("users").get().then(snapshot=>{
          snapshot.forEach(snap => {
            if(snap.id === ranking.id){
              this.high_score = snap.get('score');
            }
          });
        })     
      }
    }
  }


  replay() {
    let random_image: number = Math.floor(Math.random() * 18);
    this.troll_face = "assets/icon/".concat(random_image.toString()).concat(".png");
    this.wrong = false;
    this.turn = 3;
    this.number_question = 1;
    this.random = Math.floor(Math.random() * 500);
  }

  goToNextQuestion() {
    let random_image: number = Math.floor(Math.random() * 18);
    this.troll_face = "assets/icon/".concat(random_image.toString()).concat(".png");
    this.correct = false;
    this.number_question++;
    this.random = Math.floor(Math.random() * 500);
  }

  goToMenu() {
    // this.navCtrl.push(HomePage)
    this.navCtrl.setRoot("HomePage");
    this.navCtrl.popToRoot();
  }

  goToRank(){
    this.navCtrl.push("RankingPage");
  }
}
