import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController  } from 'ionic-angular';

/**
 * Generated class for the RepasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repas',
  templateUrl: 'repas.html',
})
export class RepasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController  ) {
    this.menuCtrl.close();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepasPage');
  }

  like(){
    alert("Like");
  }
  dislike(){
    alert("Dislike");
  }


}
