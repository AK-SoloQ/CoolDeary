import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import {
  GoogleMap,
  CameraPosition,
} from '@ionic-native/google-maps';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CardIO } from '@ionic-native/card-io';
import {
 GoogleMaps,
 GoogleMapsEvent,
 GoogleMapOptions,

} from '@ionic-native/google-maps';
import { Nav } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  lock: boolean = false;
  androidDevise: boolean = false;
  iphoneDevis: boolean = false;
  data: any = {
    "name": "CousCous",
    'image': "https://images.marmitoncdn.org/recipephotos/multiphoto/46/46c57494-29a4-4bdb-8b21-2eb0d76ec632_normal.jpg",
    'description': "Le couscous est un plat berbère originaire du Maghreb. Il est à base de semoule de blé dur. Les légumes qui composent le couscous varient d'une recette à l'autre.",
    'date': "Avril 25, 2017",
  }
  data2: any = {
    image: "http://img.fac.pmdstatic.net/fit/http.3A.2F.2Fwww.2Efemmeactuelle.2Efr.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fcuisine.2Frecettes.2Fplat-unique.2Ftagliatelles-sauce-bolognaise-02481.2F10313466-2-fre-FR.2Ftagliatelles-sauce-bolognaise.2Ejpg/1200x600/crop-from/center/tagliatelles-sauce-bolognaise.jpeg",
    name: "Makrouna",
    'description': "Les macaronis (en italien : maccheroni) sont une variété de pâtes alimentaires, à base de semoule de blé dur, en forme de longs tubes allongés de 5 à 6 cm.",
    'date': "Avril 25, 2017",

  }
  tables = [this.data, this.data2];
  map: GoogleMap;
  itemAfficher: any = {
    image: "",
    name: "",
    description: "",
    date: ""
  }
  mapElement: HTMLElement;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private camera: Camera, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private cardIO: CardIO, public alertCtrl: AlertController, private googleMaps: GoogleMaps, private nav :Nav) {
    alert(JSON.stringify(this.viewCtrl.data.Meal.meal.mealLatitude) + " -- " + JSON.stringify(this.viewCtrl.data.Meal.meal.mealLongetude));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadMap();
  }

  cameraPosition() {

    let mCamera: CameraPosition = {
      target: {
        lat: Number(this.viewCtrl.data.Meal.meal.mealLatitude),
        lng: Number(this.viewCtrl.data.Meal.meal.mealLongetude)
      },
      zoom: 15,
      tilt: 30,
      bearing: 50,
    }
    this.map.moveCamera(mCamera);
  }

  dismiss() {
    this.nav.popToRoot();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');

            this.cardIO.canScan()
              .then(
              (res: boolean) => {
                if (res) {
                  let options = {
                    requireExpiry: true,
                    requirePostalCode: true,
                    requireCCV: true,
                    hideCardIOLogo: true,
                    useCardIOLogo: true,
                    guideColor: '#f1ad0c'

                  };
                  this.cardIO.scan(options).then((response) => {
                    alert(response.cardType);
                  }).then((data) => {

                  }).catch((ex) => {
                    alert('Error fetching users' + ex);
                  });
                }
              }
              );



          }
        }
      ]
    });
    confirm.present();
  }
  addMeal(event) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.navCtrl.push("AjouterPage", imageData);
      loader.dismiss();
    }, (err) => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: 'Please check the app setting',
        duration: 3000
      });
      toast.present();
    });
  }
  showMeal(event, item) {
    console.log("afficher");
    if (item != null) {
      this.navCtrl.push("AfficherMealPage", item);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Choice a meal in the map',
        duration: 3000
      });
      toast.present();
    }
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: Number(this.viewCtrl.data.Meal.meal.mealLatitude),
          lng: Number(this.viewCtrl.data.Meal.meal.mealLongetude)
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.viewCtrl.data.Meal.meal.mealName,
          icon: '#f1ad0c',
          animation: 'DROP',
          position: {
            lat: Number(this.viewCtrl.data.Meal.meal.mealLatitude),
            lng: Number(this.viewCtrl.data.Meal.meal.mealLongetude)
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }












  /*async loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': '#f1ad0c',
        'controls': {
          'compass': false,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': this.location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let markerOptions: GoogleMapsMarkerOptions = {
          position: new GoogleMapsLatLng(36.86653669999999, 10.164723299999991),
          title: "hello",
        };
          marker.showInfoWindow();
        });
        console.log('Map is ready!');
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }*/



}
