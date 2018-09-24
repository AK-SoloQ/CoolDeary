import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { CardIO } from '@ionic-native/card-io';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';

import { IonicImageViewerModule } from 'ionic-img-viewer'

import { Facebook } from '@ionic-native/facebook';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { ConnexionProvider } from '../providers/connexion/connexion';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { OpenNativeSettings } from "@ionic-native/open-native-settings";


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8de345d9'
  },
  'auth': {
    'google': {
      'webClientId': '105385707015-qh4c0qej4c32vmkf57ui8c430aau6cli.apps.googleusercontent.com',
      'scope': []
    },
    'facebook': {
      'scope': []
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CardIO,
    Geolocation,
    GoogleMaps,
    NativeGeocoder,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnexionProvider,
    File,
    FileTransfer,
    OpenNativeSettings,


  ]
})
export class AppModule {}
