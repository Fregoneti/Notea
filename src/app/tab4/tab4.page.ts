import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
public language:string;
public fotoString:string;
public usuarioString:string;
public desarrolladorString:string;
public aboutString:string;
public mailString:string;


  constructor(private globalization: Globalization,
    private _translate: TranslateService,) {  _translate.setDefaultLang('es');}

  ngOnInit() {
  }

  //Lenguaje

  _initialiseTranslation(): void {
    this._translate.get('PHOTO').subscribe((res: string) => {
      this.fotoString = res;
    });
    this._translate.get('USER').subscribe((res: string) => {
      this.usuarioString = res;
    });
    this._translate.get('DEVELOPER').subscribe((res: string) => {
      this.desarrolladorString = res;
    });

    this._translate.get('ABOUT').subscribe((res: string) => {
      this.aboutString = res;
    });

    
    this._translate.get('MAIL').subscribe((res: string) => {
      this.mailString = res;
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


}
