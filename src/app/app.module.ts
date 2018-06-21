import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';
import { MyApp } from './app.component';
import { AdMobFree } from '@ionic-native/admob-free';
import { NativeAudio } from '@ionic-native/native-audio';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import {GamePage} from '../pages/game/game';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';
import { Device } from '@ionic-native/device';
import { Media, MediaObject } from '@ionic-native/media';
// import { DeviceAccounts } from '@ionic-native/device-accounts';
// import { HttpService } from '../providers/http-service';

export const config = {
  apiKey: "AIzaSyAlxtjn55W6Fm7K5NP8S9HONd1KIe98glE",
  authDomain: "firstfirebase-900ea.firebaseapp.com",
  databaseURL: "https://firstfirebase-900ea.firebaseio.com",
  projectId: "firstfirebase-900ea",
  storageBucket: "firstfirebase-900ea.appspot.com",
  messagingSenderId: "730195513826"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    HttpModule,
    // GamePage,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    NativeAudio,
    UniqueDeviceID,
    GamePage,
    Device,
    Media,
    // MediaObject,
    // DeviceAccounts,
    // HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
