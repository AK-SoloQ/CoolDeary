import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "@ionic/cloud-angular";
import { Geolocation } from "@ionic-native/geolocation";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult
} from "@ionic-native/native-geocoder";

/*
  Generated class for the ConnexionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConnexionProvider {
  EventAddMeal: EventEmitter<any> = new EventEmitter();
  EventAddUser: EventEmitter<any> = new EventEmitter();
  EventListMeals: EventEmitter<any> = new EventEmitter();
  EventgetPersonnalMeal: EventEmitter<any> = new EventEmitter();
  private positionZone = {
    mealLatitude: null,
    mealLongetude: null,
    mealLocation: null
  };

  constructor(
    public http: Http,
    public user: User,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
    console.log("Hello ConnexionProvider Provider");
  }

  addUsertoServeur(json) {
    let url = "https://mdeal.herokuapp.com/addUser";
    this.http
      .post(url, json)
      .map(res => {
        res.json();
        var strig = String.fromCharCode.apply(
          null,
          new Uint16Array(res.arrayBuffer())
        );
        var mjson = JSON.parse(strig);
        if (mjson.status == "done") {
          localStorage.setItem("status", mjson._id);
          this.EventAddUser.next("Add");
        } else {
          // alert('quoi')
          this.EventAddUser.next("NoAdded");
        }
      })
      .subscribe(data => {
        console.log("data");
        console.log(data);
      });
  }

  login(json) {
    var jsonToSend = {
      Email: json.Email,
      LoginWith: json.LoginWith
    };
    let url = "https://mdeal.herokuapp.com/login";
    this.http
      .post(url, jsonToSend)
      .map(res => {
        res.json();
        var strig = String.fromCharCode.apply(
          null,
          new Uint16Array(res.arrayBuffer())
        );
        var mjson = JSON.parse(strig);
        console.log("MMMMMMMMJSON");
        console.log(strig);
        console.log(mjson._id);
        if (mjson.status == "done") {
          localStorage.setItem("status", mjson._id);
          this.EventAddUser.next("Added");
        } else {
          this.addUsertoServeur(json);
        }
      })
      .subscribe(data => {
        console.log("data");
        console.log(data);
      });
  }

  addMeal(json) {
    var that = this;
    this.getCurrentPosition(function(value) {
      if (value == "Error getting location") {
        //alert("position not found");
        that.EventAddMeal.emit("Error getting location");
      } else {
        json.meal.mealLocation = value.mealLocation;
        let url = "https://mdeal.herokuapp.com/addAllMeals";
        that.http
          .post(url, json)
          .map(res => {
            //alert("serveur Response")
            res.json();
            var strig = String.fromCharCode.apply(
              null,
              new Uint16Array(res.arrayBuffer())
            );
            var mjson = JSON.parse(strig);
            //alert(strig);
            if (mjson.status == "done") {
              that.EventAddMeal.next("Done");
            } else {
              that.EventAddMeal.next("NoDone");
            }
          })
          .subscribe(data => {
            //console.log('data')
            //console.log(data);
          });
      }
    });
  }

  getCurrentPosition(callback) {
    // Get geoloacation with ionic api getCurrentPosition
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // Return reverse geoloaaction with latitude and longitude
        this.nativeGeocoder
          .reverseGeocode(resp.coords.latitude, resp.coords.longitude)
          .then((result: NativeGeocoderReverseResult) => {
            console.log(
              "The address is " + result.street + " in " + result.countryCode
            );
            this.positionZone.mealLatitude = resp.coords.latitude;
            this.positionZone.mealLongetude = resp.coords.longitude;
            this.positionZone.mealLocation = result;
            console.log("result of getCurrentPosition");
            console.log(result);
            return callback(this.positionZone);
          })
          .catch((error: any) => {
            console.log("error on NativeGeocoderReverseResult " + error);
            return callback("Error getting location");
          });
        //  console.log(resp.coords.latitude +'||'+resp.coords.longitude +'||'+ resp.timestamp.toString +'\\'+resp.coords.speed);
      })
      .catch(error => {
        console.log("Error getting location", error);
        return callback("Error getting location");
      });
  }

  getPersonnalMeal(json) {
    console.log("the Personnal json send is ");
    console.log(json);
    //alert(JSON.stringify(json));
    var url = "https://mdeal.herokuapp.com/getPersonnalMeal";
    this.http
      .post(url, json)
      .map(res => {
        var strig = String.fromCharCode.apply(
          null,
          new Uint16Array(res.arrayBuffer())
        );
        var items = JSON.parse(strig);

        if (items.status == "done") {
          this.EventgetPersonnalMeal.emit(items.data);
        } else if (items.status == "empty") {
           this.EventgetPersonnalMeal.emit("empty");
        } else {
          this.EventgetPersonnalMeal.emit("NoDone");
        }
      })
      .subscribe(
        data => {
          //console.log('data')
          //console.log(data);
        },
        err => {
          alert("Connection Problemes" + err);
        }
      );
  }
  findMealsAround(skip) {
    var that = this;
    this.getCurrentPosition(function(value) {
      var json;
      var url;
      if (value == "Error getting location") {
        console.log("no position");
        json = {
          skip: skip,
          locality: "Ariana",
          countryName: "Tunisie",
          administrativeArea: "Ariana",
          subAdministrativeArea: "Ariana"
        };
        url = "https://mdeal.herokuapp.com/getAllMeals";
        that.http
          .post(url, json)
          .map(res => {
            var strig = String.fromCharCode.apply(
              null,
              new Uint16Array(res.arrayBuffer())
            );
            var items = JSON.parse(strig);
            console.log("findMealsArround Serveur resp");
            console.log(items);
            console.log("ici error");
            console.log(JSON.stringify(items.data));
            if (items.data.length != 0) {
              that.EventListMeals.next(items.data);
            } else {
              that.EventListMeals.next([]);
            }
          })
          .subscribe(data => {
            //console.log('data')
            //console.log(data);
          });
      } else {
        console.log("position");
        json = {
          mealLocation: value.mealLocation,
          skip: skip,
          locality: value.mealLocation.locality,
          countryName: value.mealLocation.countryName,
          administrativeArea: value.mealLocation.administrativeArea,
          subAdministrativeArea: value.mealLocation.subAdministrativeArea
        };
        url = "https://mdeal.herokuapp.com/getAllMeals";
        that.http
          .post(url, json)
          .map(res => {
            var strig = String.fromCharCode.apply(
              null,
              new Uint16Array(res.arrayBuffer())
            );
            var items = JSON.parse(strig);
            console.log("findMealsArround Serveur resp");
            console.log(items);
            console.log("ici error");
            console.log(JSON.stringify(items.data));
            if (items.data.length != 0) {
              that.EventListMeals.next(items.data);
            } else {
              that.EventListMeals.next([]);
            }
          })
          .subscribe(data => {
            //console.log('data')
            //console.log(data);
          });
      }
    });
    /*this.EventPositionZone.subscribe((value) => {

    })*/
  }
}
