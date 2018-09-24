import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  ModalController,
  PopoverController,
  AlertController,
  MenuController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ConnexionProvider } from "../../providers/connexion/connexion";
import { File } from "@ionic-native/file";
import { ActionSheetController } from "ionic-angular";
/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var cordova: any;
@IonicPage()
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  private skip = 0;
  private listMeal;
  public tables = [];
  public AllTables = [];
  private subEventListMeals;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    private conn: ConnexionProvider,
    public popoverCtrl: PopoverController,
    private file: File,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.close();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListPage");
    this.tables = [];
    this.AllTables = [];
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.conn.findMealsAround(this.skip);
    this.subEventListMeals = this.conn.EventListMeals.subscribe(value => {
      console.log("EventListMeals");
      this.listMeal = null;
      this.listMeal = value;
      console.log(JSON.stringify(value));
      for (let sousjson of value) {
        this.AllTables.push(sousjson);
        if (sousjson.meal) {
          // console.log(sousjson.Meal)
          this.tables.push({
            name: sousjson.meal.mealName,
            mealImages: sousjson.meal.mealImage,
            description: sousjson.meal.mealDescription,
          });
        }
      }
      loader.dismiss();
    });
  }

  addMeal(event) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      const options: CameraOptions = {
        quality: 75,
        destinationType: this.camera.DestinationType.FILE_URI, //DATA_URL
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 300,
        saveToPhotoAlbum: false
      };
      this.camera.getPicture(options).then(
        imageData => {
          loader.dismiss();
          //let base64Image = 'data:image/jpeg;base64,' + imageData;
          var sourceDirectory = imageData.substring(
            0,
            imageData.lastIndexOf("/") + 1
          );
          var sourceFileName = imageData.substring(
            imageData.lastIndexOf("/") + 1,
            imageData.length
          );
          sourceFileName = sourceFileName.split("?").shift();
          this.file
            .copyFile(
              sourceDirectory,
              sourceFileName,
              cordova.file.externalApplicationStorageDirectory,
              sourceFileName
            )
            .then(
              (result: any) => {
                var JSONImage = {
                  imagePath: imageData,
                  mageChosen: 1,
                  imageNewPath: result.nativeURL
                };
                this.navCtrl.push("AjouterPage", JSONImage);
              },
              err => {
                let alert = this.alertCtrl.create({
                  title: "Error Image!",
                  subTitle: "Problem Image not Found!" + JSON.stringify(err),
                  buttons: ["OK"]
                });
                alert.present();
              }
            );
        },
        err => {
          // Handle error
          let toast = this.toastCtrl.create({
            message: "Camera operation canceled",
            duration: 3000
          });
          toast.present();
          loader.dismiss();
        }
      );
    });
    //console.log("Ajouter");
  }

  showMeal(event, index) {
    //console.log("afficher");
    if (index != null) {
      //this.showConfirm();
      this.navCtrl.push("HomePage", this.AllTables[index]);
    } else {
      let toast = this.toastCtrl.create({
        message: "Connection problem",
        duration: 3000
      });
      toast.present();
    }
  }
  presentPopover() {
    let popover = this.popoverCtrl.create(
      "PopoverlistPage",
      {},
      { showBackdrop: false, enableBackdropDismiss: false }
    );
    popover.present();
  }

  ionViewWillUnload() {
    let itemid = JSON.parse(localStorage.getItem("USERID"));
    if (itemid != null) {
      this.subEventListMeals.unsubscribe();
    }
  }
  ionViewDidLeave() {
    let itemid = JSON.parse(localStorage.getItem("USERID"));
    if (itemid != null) {
      this.subEventListMeals.unsubscribe();
    }
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.skip = this.skip + 5;
    this.conn.findMealsAround(this.skip);
    console.log("Async operation has ended");
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  presentActionSheet(event) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Modify your album",
      buttons: [
        {
          text: "Report",
          role: "destructive",
          handler: () => {
            console.log("Destructive clicked");
          }
        },
        {
          text: "Archive",
          handler: () => {
            console.log("Archive clicked");
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }
}
