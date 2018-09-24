import { Component ,ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenurootPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menuroot',
  templateUrl: 'menuroot.html',
})
export class MenurootPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: string = "ListPage";
  pages: Array<{ title: string, component: any , ios:any, android:any, selected : boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: "Today Deary", component: "ListPage", ios: 'ios-home', android: 'md-home', selected: true },
      { title: 'Your Deary', component: "ProfilPage", ios: 'ios-basket', android: 'md-basket', selected: false  },
      { title: 'Your Deary Sell', component: "RepasPage", ios: 'ios-cart', android: 'md-cart', selected: false  },
      { title: 'Your Deary Settings', component: "ParametresPage", ios: 'ios-settings', android: 'md-settings', selected: false  }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenurootPage');
  }

  openPage(page, i) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('open page and index',i);

    for(let element in this.pages){
      if(element == i){
        this.pages[element].selected = true;
      }else{
        this.pages[element].selected = false
      }
    }

    this.nav.setRoot(page.component);
  }

}
