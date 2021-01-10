import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { cuenta } from '../model/cuenta';
import { AuthService } from '../services/auth.service';
import { Globalization } from '@ionic-native/globalization/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user:cuenta;
  darkMode: boolean=true;
  public language: string;
  public languageString:string;
  public darkModeString: string;
  public nombreString:string;
  public logoutString:string;
  public profileString:string;

  constructor(private authS:AuthService, private router:Router, private _translate: TranslateService, private globalization: Globalization) {
    this.user=authS.user;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    _translate.setDefaultLang('es');
    this.darkMode=prefersDark.matches;

    
  }
  //Logout
  
  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  //Dark

  cambiodark(){
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('dark');
  }


  //Lenguaje

  _initialiseTranslation(): void {
    this._translate.get('DARKMODE').subscribe((res: string) => {
      this.darkModeString = res;
    });
    this._translate.get('LANGUAGE').subscribe((res: string) => {
      this.languageString = res;
    });
    this._translate.get('NAME').subscribe((res: string) => {
      this.nombreString = res;
    });
    this._translate.get('LOGOUT').subscribe((res: string) => {
      this.logoutString = res;
    });
    this._translate.get('PROFILE').subscribe((res: string) => {
      this.profileString = res;
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
