import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import { LocationPage } from '../pages/location/location.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasks:FormGroup;
  public language: string;
  public tituloString:string;
  public descripcionString:string;
  public addString:string;
  public gpsString:string;
  public addTaskString:string;
  public location:string;

  constructor(
    private formBuilder:FormBuilder,
    private notasS:NotasService,
    private router:Router,
    private tran:TranslateModule,
    private modalController:ModalController,
    private globalization: Globalization,
    private _translate: TranslateService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
   // _translate.setDefaultLang('es');
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:[''],
     
    })
  }

  

  public async sendForm(){
    await this.presentLoading();
    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
      coordenadas:this.location

    }
    this.notasS.agregaNota(data)
    .then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:'',
     
        
      })
      this.loadingController.dismiss();
      this.presentToast("Nota guardada","success");
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
      console.log(err);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner:'crescent'
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color:col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }


  public async map(nota:Nota){
    const modal = await this.modalController.create({
      component: LocationPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.location = data['data']; //Variable del modal
        console.log(this.location+"VAMOS BIEN LOCO");
        
        
        
    });

    return await modal.present();
  }

  // //Lenguaje

  // _initialiseTranslation(): void {
  //   this._translate.get('TITTLE').subscribe((res: string) => {
  //     this.tituloString = res;
  //   });
  //   this._translate.get('DESCRIPTION').subscribe((res: string) => {
  //     this.descripcionString = res;
  //   });
  //   this._translate.get('GPS').subscribe((res: string) => {
  //     this.gpsString = res;
  //   });
  //   this._translate.get('ADD').subscribe((res: string) => {
  //     this.addString = res;
  //   });
  //   this._translate.get('ADDTASK').subscribe((res: string) => {
  //     this.addTaskString = res;
  //   });
    

  // }

  // ionViewDidEnter(): void {
  //   this.getDeviceLanguage();
  //   //this.tasks.get('coordenada').setValue(this.nota.coo);
    
  // }

  // public changeLanguage(): void {
  //   this._translateLanguage();
  // }
  
  // _translateLanguage(): void {
  //   this._translate.use(this.language);
  //   this._initialiseTranslation();
  // }

  // _initTranslate(language) {
  //   // Set the default language for translation strings, and the current language.
  //   this._translate.setDefaultLang('es');
  //   if (language) {
  //     this.language = language;
  //   }
  //   else {
  //     // Set your language here
  //     this.language = 'en';
  //   }
  //   this._translateLanguage();
  // }

  // getDeviceLanguage() {
  //   if (window.Intl && typeof window.Intl === 'object') {
  //     this._initTranslate(navigator.language)
  //   }
  //   else {
  //     this.globalization.getPreferredLanguage()
  //       .then(res => {
  //         this._initTranslate(res.value)
  //       })
  //       .catch(e => {console.log(e);});
  //   }
  // }

}
