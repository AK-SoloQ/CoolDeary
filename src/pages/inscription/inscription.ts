import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';

import { GoogleAuth, FacebookAuth, User, } from '@ionic/cloud-angular';
import { ConnexionProvider } from '../../providers/connexion/connexion';


/**
 * Generated class for the InscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  public mUser = {
    "LoginWith": "",
    "uid": "",
    "Email": "",
    "Password": "",
    "Confirm": "",
    "FullName": "",
    "Gender": "",
    "PhoneNumber": "",
    "PhoneToken": "",
    "UserLocation": "",
    "Report": 0,
    "Banne": false,
    "ImageProfile": "",
    "MealCommend": [],
    "rowData": null
  }
  private subscribeEventUpdated;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public googleAuth: GoogleAuth, public user: User, public facebookAuth: FacebookAuth, private conn: ConnexionProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  ionViewDidLeave() {
    this.subscribeEventUpdated.unsubscribe();
  }
  /*simpleLogin(event) {
    console.log("event on simpleLogin select", event);
    this.navCtrl.push('FormulairePage');
  }

  Logining() {
    console.log("login ")
    this.navCtrl.push('AuthentificationPage')
  }*/


  facebookLogin(event) {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    this.navCtrl.setRoot('MenurootPage');
    /*this.facebookAuth.login()
      .then((res) => {
        this.mUser.LoginWith = "facebook";
        this.mUser.FullName = this.user.social.facebook.data.full_name;
        this.mUser.ImageProfile = this.user.social.facebook.data.profile_picture;
        this.mUser.uid = this.user.social.facebook.uid;
        this.mUser.Email = this.user.social.facebook.data.email;
        this.mUser.rowData = this.user.social.facebook.data.raw_data;

        this.conn.login(this.mUser);

        this.subscribeEventUpdated = this.conn.EventAddUser.subscribe((value) => {
          // loader.dismissAll()
          if (value == "NoAdded") {
            loader.dismissAll();
            let alert = this.alertCtrl.create({
              title: 'Error Connection!',
              subTitle: 'Problem connection No Added!',
              buttons: ['OK']
            });
            alert.present();
          } else if (value == "Add") {
            //confirm("Add Now");
            loader.dismissAll();
            //confirm(localStorage.getItem("status"))
          } else if (value == "Added") {
           // confirm("Added 3ando modda");
            loader.dismissAll();
            //confirm(localStorage.getItem("status"))
            this.navCtrl.setRoot('MenurootPage');
          }
        });
      })
      .catch(e => {
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Facebook error!',
          subTitle: 'Problem with Facebook SDK!',
          buttons: ['OK']
        });
        alert.present();
      }); */
  }


  googleplusLogin(event) {
    console.log("event on googleplusLogin select");
    console.log(event);
    // console.log(JSON.stringify(this.user.social.google));
    this.googleAuth.login()
      .then((res) => {
        console.log("the google plus res : " + JSON.stringify(res));
        console.log(res);
        console.log("google");
        console.log(this.user.social.google);
        let alert = this.alertCtrl.create({
          title: 'Service Google Plus!',
          subTitle: ' Service actuellement indisponible!',
          buttons: ['OK']
        });
        alert.present();

      })
      .catch((err) => { console.log("error with googleplusLogin :", err); })

  }


}
