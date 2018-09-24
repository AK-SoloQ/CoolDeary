import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';
import { ConnexionProvider } from '../../providers/connexion/connexion';
import { MenuController } from 'ionic-angular';


/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  public profil = {
    full_name: null,
    profile_picture: null,
    facebook_raw_data: {}
  };
  private tables: any[] = [];
  private skip = 0;
  private SubEventgetPersonnalMeal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private user: User, public googleAuth: GoogleAuth, public facebookAuth: FacebookAuth, private conn: ConnexionProvider, public alertCtrl: AlertController, public menuCtrl: MenuController, public loadingCtrl: LoadingController, ) {
    this.menuCtrl.close();
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    if (this.user.social.google) {
      alert(this.user.social.google)
    } else
      if (this.user.social.facebook) {
        // alert(this.facebookAuth.storeToken("EAABkgEPQTmwBADPqFZBrjVIaknT4wNKZAZAtwKgZCu39qOAix9ZA8GDhr3ZAFGbzsHUPkdDms6wRFphp43xZAGw7m3onWzlqJGMj6HZBxZCs1q9oBcHkQBtDwJbN1ZCU7rnGjTJb5ZBPh4qkCy8LVVCmsjyQ36xomPVtGKepiw8OXojrIw3DOfZCLIorwohxexnaao8ZD"));
        //this.user.
        // alert("facebook")
        this.profil.full_name = this.user.social.facebook.data.full_name;
        this.profil.profile_picture = this.user.social.facebook.data.profile_picture;
        this.profil.facebook_raw_data = this.user.social.facebook.data.raw_data;
        console.log(this.profil.facebook_raw_data);
        var sendedJSon = {
          _idUser: localStorage.getItem("status"),
          skip: this.skip,
        }
        this.conn.getPersonnalMeal(sendedJSon)
      } else {
        this.profil.facebook_raw_data["email"] = ""
      }

    this.SubEventgetPersonnalMeal = this.conn.EventgetPersonnalMeal.subscribe((value) => {
      if (value == "NoDone") {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Connection Done!',
          subTitle: 'But No Meals Found.',
          buttons: [{
            text: 'OK',
            role: 'OK',
            handler: () => {
              console.log('Destructive clicked');
            }
          }]
        });
        alert.present();

      } if(value == "empty") {
        if(this.tables.length == 0){
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: "Connection Done!",
            subTitle: "But No Meals Found.",
            buttons: [
              {
                text: "OK",
                role: "OK",
                handler: () => {
                  console.log("Destructive clicked");
                }
              }
            ]
          });
          alert.present();
        }
      }else  {
        console.log("the presonnal data meals");
        console.log(JSON.stringify(value));
        for (let item of value) {
            this.tables.push({
              image: item.meal.mealImage,
              name: item.meal.mealName,
              desc: item.meal.mealDescription
            });
        }
        loader.dismiss();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }
  ionViewWillUnload(){
    this.SubEventgetPersonnalMeal.unsubscribe()
  }
  ionViewDidLeave(){
   this.SubEventgetPersonnalMeal.unsubscribe();
  }

  buy() {
    alert("buy")
  }
  show() {
    alert("show")
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.skip = this.skip + 5;
    var sendedJSon = {
      _idUser: localStorage.getItem("status"),
      skip: this.skip,
    }
    this.conn.getPersonnalMeal(sendedJSon)

    console.log('Async operation has ended');
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000)

  }
}
