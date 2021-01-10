import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  public  ringtoneslist:any= [];
  //public listaNotas = [];
  pickupLocation: string;
  public listaNotas :any[] = Array[20];
  public listaNotasBuscar=[];
  public language:string;
  public searchString:string;
  public taskString:string;

 
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private globalization: Globalization,
    private _translate: TranslateService,
    public alertController: AlertController,
    private vibration: Vibration,
    private Nativeringtones: NativeRingtones,
    private filePath: FilePath) 
    
    {      
      _translate.setDefaultLang('es');
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.pickupLocation = this.router.getCurrentNavigation().extras.state.pickupLocation;
      }
    });
     }

  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(){
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }


  public cargaDatos($event=null){
    try {
      this.notasS.leeNotas()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
          });
          //Ocultar el loading
          this.listaNotasBuscar=this.listaNotas;
          console.log("ASDASDSDADDASDASDASDASDASDSDASDAD");
          console.log(this.listaNotasBuscar);
          
          
          console.log(this.listaNotas);
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }


  public borraNota(id:any){
    this.notasS.borraNota(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaNotas.forEach((nota)=>{     
        if(nota.id!=id){
         tmp.push(nota);
        }
      })
      this.listaNotas=tmp;
    })
    .catch(err=>{

    })
  }
  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    this.Nativeringtones.playRingtone('../../assets/ringtones/edit.mp3');
    return await modal.present();
  }
/**
 * Nos crea una alerta al querer borrar una nota
 * @param id Id de la nota que queremos borrar
 */
  async alertBorraNota(id:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrar Nota',
      message: '¿Quiere borrar la nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alert) => {}
        }, {
          text: 'Confirmar',
          handler: (alert) => {
            this.borraNota(id);
             this.Nativeringtones.playRingtone('../../assets/ringtones/basura.mp3');
             this.vibration.vibrate(1000);
          }
        }
      ]
    });

    await alert.present();
  }

  getRingtones(){
    this.Nativeringtones.getRingtone().then((ringtones)=>{
      this.ringtoneslist=ringtones;
    },(err)=>{alert(JSON.stringify(err))

    }
    )
  }

  playRingtones(uri){
    this.filePath.resolveNativePath(uri).then((nativePath)=>{
      this.Nativeringtones.playRingtone(nativePath).then((val)=>{

      },(err)=>{
        alert(JSON.stringify(err))
      })
    },(err)=>{
      alert(JSON.stringify(err))} )

  }
  onpickupClick(){
    this.router.navigate(['pickup-location']);
  }



  // loadData(event) {
  //   setTimeout(() => {

  //     if(this.listaNotas.length>50){
  //       event.target.complete();
  //       return;
  //     }
     
  //     const nuevoArr=Array(20);
  //     this.listaNotas.push(...nuevoArr);
  //     event.target.complete();
  //   },1000);

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
    
  // }
   
  

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }




  //Lenguaje

  _initialiseTranslation(): void {
    this._translate.get('TASK').subscribe((res: string) => {
      this.taskString = res;
    });
    this._translate.get('SEARCH').subscribe((res: string) => {
      this.searchString = res;
    });
  
  }

  ionViewDidEnter(): void {
    this.getDeviceLanguage()
  }

  public changeLanguage(): void {
    this._translateLanguage();
  }
  
  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'en';
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    else {
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});
    }
  }


  initializeItems(){
    this.listaNotasBuscar = this.listaNotas;
  }

  getNotaSearchBar(ev:any){
    this.initializeItems();
    let val = ev.target.value;

    if(val && val.trim() != ""){
      this.listaNotasBuscar = this.listaNotasBuscar.filter((item)=>{
        return (item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}

