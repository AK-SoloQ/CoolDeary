import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '@ionic/cloud-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: string ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: Auth) {
    if (this.auth.isAuthenticated()) {
      this.rootPage = 'MenurootPage';
    //this.rootPage = 'AjouterPage';
    } else {
      this.rootPage = 'InscriptionPage';
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

