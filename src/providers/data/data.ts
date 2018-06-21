
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
export class User{
    id : string = "";
    name : string = "";
    score : number = 0;
    avatar : string = "";
  
    constructor(id: "", name : string, avatar : string, score : number){
      this.id = "";
      this.name = name;
      this.avatar = avatar;
      this.score = score;
    }
  }
  
@Injectable()
export class DataProvider {
  public mUser : User = new User("", "", "",0);
  document_arr :Array<String> =  [];
  constructor() {
    this.mUser.name = "Vnk";
  }

  addUser(rank : User){  
      firebase.firestore().collection("users").get().then(snapshot=>{
        snapshot.forEach(snap => {
          this.document_arr.push(snap.id);
        });
      })
      if(!this.document_arr.includes(rank.id)){
        firebase.firestore().collection("users").doc(rank.id.toString()).set(rank);
      } 
  }

  updateScore(newScore : number, id : string){
    if(newScore > this.mUser.score){
      this.mUser.score = newScore;
      firebase.firestore().doc("users/".concat(id.toString())).update('score',this.mUser.score);
    }
  }

}
