import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "HomePage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  private admobFree: AdMobFree) {
    platform.ready().then(() => {

      const bannerConfig: AdMobFreeBannerConfig = {
        id : "ca-app-pub-3940256099942544/6300978111",
        // add your config here
        // for the sake of this example we will just use the test config
        isTesting: false,
        autoShow: true
       };
       this.admobFree.banner.config(bannerConfig);
       
       this.admobFree.banner.prepare()
         .then(() => {
           console.log("a");
           this.admobFree.banner.show();
           // banner Ad is ready
           // if we set autoShow to false, then we will need to call the show method here
         })
         .catch(e => console.log(e));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();
      // this.showAdmobBannerAds();
    });
  }
}

