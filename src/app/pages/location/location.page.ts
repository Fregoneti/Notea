import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Map, tileLayer, marker } from "leaflet";
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import { Nota } from "src/app/model/nota";
import { ModalController } from "@ionic/angular";
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, OnDestroy {

  @Input('nota') nota:Nota;
  coor:any;
  map: Map;
  newMarker: any;
  address: string[];
constructor(private geocoder: NativeGeocoder, private router: Router, 
  private modalController:ModalController,
 ) {}
  ngOnInit(): void {
    console.log(this.nota);
    
    
  }
  ngOnDestroy(): void {
    this.map.remove();
  }

ionViewDidEnter() {
  console.log("entro");
  
    this.loadMap();
  }
loadMap() {
    this.map = new Map("mapId").setView([17.385, 78.4867], 13);
tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Francisco de los Rios'
    }).addTo(this.map);
  }
 locatePosition() {
    //let coor = await this.geo.getCurrentPosition(succes);
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        
        draggable: true
      }).addTo(this.map);
      this.newMarker.bindPopup("¡Te encuentras aquí!").openPopup();
      this.getAddress(e.latitude, e.longitude); // This line is added
      this.coor=e.latitude+" "+e.longitude;
      console.log(this.coor);
      
      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
        
        this.getAddress(position.lat, position.lng);// This line is added
       // this.coor=e.latitude+" "+e.longitude;
        console.log(this.coor);
       
      });
    });
  }
  
  //The function below is added
  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = Object.values(results[0]).reverse();
      console.log(this.address);
      
    });
  }
// The function below is added
  confirmPickupLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.address
       
        
      }
    };
    this.modalController.dismiss(this.coor);
  }

  goBack(){
    this.modalController.dismiss;
  }

}