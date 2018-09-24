import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ViewController, Platform, AlertController,  } from 'ionic-angular';
import { ConnexionProvider } from '../../providers/connexion/connexion';

/*import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';*/
import { Transfer } from 'ionic-native';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OpenNativeSettings } from "@ionic-native/open-native-settings";


/**
 * Generated class for the AjouterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-ajouter",
  templateUrl: "ajouter.html"
})
export class AjouterPage {
  EventLoading: EventEmitter<any> = new EventEmitter();
  public imageSelected = false;
  public meal = {
    id: "",
    numberBooking: null,
    numberDishes: 0,
    mealName: "",
    mealPrice: 0,
    mealDescription: "",
    mealLatitude: null,
    mealLongetude: null,
    mealImage:
      "https://thumb1.shutterstock.com/display_pic_with_logo/1112138/503294140/stock-photo-bar-interior-with-stools-tables-and-large-vertical-poster-on-dark-brick-wall-concept-of-pub-503294140.jpg",
    mealLocation: null,
    mealPublish: true,

  };
  public jsonMeal = {
    _idUser: null,
    meal: {
      id: null,
      numberBooking: null,
      numberDishes: 0,
      mealName: null,
      mealPrice: 0,
      mealDescription: null,
      mealLatitude: null,
      mealLongetude: null,
      mealImage:
        "https://thumb1.shutterstock.com/display_pic_with_logo/1112138/503294140/stock-photo-bar-interior-with-stools-tables-and-large-vertical-poster-on-dark-brick-wall-concept-of-pub-503294140.jpg",
      mealLocation: null,
      mealPublish: true
    }
  };
  itemAfficher: any = {
    image: "",
    name: "",
    description: "",
    date: ""
  };
  private subEventAddMeal;
  private subEventLoading;
  private todo: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public platform: Platform,
    private conn: ConnexionProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private openNativeSettings: OpenNativeSettings
  ) {
    this.todo = this.formBuilder.group({
      mealName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ])
      ],
      numberDishes: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4)
        ])
      ],
      mealPrice: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3)
        ])
      ],
      mealDescription: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150)
        ])
      ]
    });
    this.subEventAddMeal = this.conn.EventAddMeal.subscribe(value => {
      if (value == "Error getting location") {
        this.EventLoading.emit("stop");
        let alert = this.alertCtrl.create({
          title: "Location Problem",
          subTitle: "Location problem please check your location settings?",
          buttons: [
            {
              text: "OK",
              role: "OK",
              handler: () => {
                console.log("Destructive clicked");
                //this.navCtrl.pop();
                this.openNativeSettings.open("location");
              }
            }
          ]
        });
        alert.present();
      } else if (value == "NoDone") {
        let alert = this.alertCtrl.create({
          title: "Error Connection!",
          subTitle: "Problem connection.!",
          buttons: ["OK"]
        });
        alert.present();
      } else {
        //loader.dismissAll();
        this.EventLoading.emit("stop");
        let alert = this.alertCtrl.create({
          title: "Connection Done!",
          subTitle: "Meal Add :)",
          buttons: [
            {
              text: "OK",
              role: "OK",
              handler: () => {
                console.log("Destructive clicked");
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }
    });
    /*this.subEventPositionZone = this.conn.EventPositionZone.subscribe((value) => {
      alert("hello subEventPositionZone")
      if (value == "NoDone") {
        // alert("position not found")
      } else {
        this.meal.mealLatitude = value.mealLatitude;
        this.meal.mealLongetude = value.mealLongetude;
        this.meal.mealLocation = value.mealLocation;
        console.log(value);
      }
      this.subEventPositionZone.unsubscribe();
    });*/
  }

  ionViewDidLeave() {
    try {
      this.subEventAddMeal.unsubscribe();
      this.subEventLoading.unsubscribe();
      //alert("leave");
    } catch (error) {
      console.log("error is ", error);
    }
  }
  ionViewWillUnload() {
    try {
      this.subEventAddMeal.unsubscribe();
      this.subEventLoading.unsubscribe();
      //alert("leave");
    } catch (error) {
      console.log("error is ", error);
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AjouterPage");
    this.platform.ready().then(() => {
      if (this.viewCtrl.data.imagePath != null) {
        this.meal.mealImage = this.viewCtrl.data.imagePath;
      } else {
        var that = this;
        let alert = this.alertCtrl.create({
          title: "Error Image!",
          subTitle: "Problem Image not Found!",
          buttons: [
            {
              text: "OK",
              role: "OK",
              handler: () => {
                console.log("OK clicked");
                that.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }

      let itemid = JSON.parse(localStorage.getItem("USERID"));
      if (itemid == null) {
        console.log("no userid");
        itemid = "00000000";
      }
      let date = new Date();
      itemid = date.getMinutes() + "-" + itemid;
      itemid = date.getHours() + itemid;
      itemid = date.getDate() + itemid;
      itemid = date.getMonth() + itemid;
      itemid = date.getFullYear() + itemid;
      this.meal.id = itemid;

      //zone to delete
      // Get geoloacation with ionic api getCurrentPosition

      /*this.geolocation.getCurrentPosition().then((resp) => {

        // Return reverse geoloaaction with latitude and longitude
        this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
          .then((result: NativeGeocoderReverseResult) => {
            console.log("The address is " + result.street + " in " + result.countryCode);
            this.meal.mealLatitude = resp.coords.latitude;
            this.meal.mealLongetude = resp.coords.longitude;
            console.log("result");
            console.log(result);
            this.meal.mealLocation = result;

          })
          .catch((error: any) => {
            console.log("error on NativeGeocoderReverseResult " + error);
          });
        //  console.log(resp.coords.latitude +'||'+resp.coords.longitude +'||'+ resp.timestamp.toString +'\\'+resp.coords.speed);
      }).catch((error) => {
        console.log('Error getting location', error);
      });*/

      //end zone to delete
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  closeImage() {
    this.imageSelected = false;
  }

  shareMeal(event) {
    this.meal.mealName = this.todo.value.mealName;
    this.meal.mealPrice = this.todo.value.mealPrice;
    this.meal.numberDishes = this.todo.value.numberDishes;
    this.meal.mealDescription = this.todo.value.mealDescription;
    var that = this;
    this.EventLoading.emit("start");
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    var data = {
      postTitle: localStorage.getItem("status") + "//" + this.meal.mealName,
      desc: this.meal.mealDescription
    };
    this.uploadPhoto(data, function(rep) {
      that.jsonMeal._idUser = localStorage.getItem("status");
      that.jsonMeal.meal.id = that.meal.id;
      that.jsonMeal.meal.mealImage = rep;
      that.jsonMeal.meal.mealLatitude = that.meal.mealLatitude;
      that.jsonMeal.meal.mealLongetude = that.meal.mealLongetude;
      that.jsonMeal.meal.mealDescription = that.meal.mealDescription;
      that.jsonMeal.meal.numberDishes = that.meal.numberDishes;
      that.jsonMeal.meal.mealLocation = that.meal.mealLocation;
      that.jsonMeal.meal.mealName = that.meal.mealName;
      that.jsonMeal.meal.mealPrice = that.meal.mealPrice;
      that.jsonMeal.meal.mealPublish = that.meal.mealPublish;

      that.conn.addMeal(that.jsonMeal);
      that.subEventLoading = that.EventLoading.subscribe(value => {
        loader.dismissAll();
      });
    });
  }

  uploadPhoto(data, callback) {
    let filename = this.viewCtrl.data.imagePath.split("/").pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { title: data.postTitle, description: data.desc }
    };

    const fileTransfer = new Transfer();

    fileTransfer
      .upload(
        this.viewCtrl.data.imageNewPath,
        "https://mdeal.herokuapp.com/api/v1/post/upload",
        options
      )
      .then(
        entry => {
          console.log("entry");
          console.log(JSON.stringify(entry));
          var stttr = JSON.stringify(entry);
          var mSTTTTR = JSON.parse(stttr);
          var syyyyr = mSTTTTR.response;

          console.log(JSON.parse(syyyyr).result.image_url);

          this.viewCtrl.data.imagePath = "";
          this.viewCtrl.data.imageChosen = 0;

          //this.navCtrl.setRoot(HomePage);

          return callback(JSON.parse(syyyyr).result.image_url);
        },
        err => {
          alert("error is error");
          alert(JSON.stringify(err));
        }
      );
  }

  taped(){
    alert("selected")
  }
}
