import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popoverlist',
  templateUrl: 'popoverlist.html',
})
export class PopoverlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverlistPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
