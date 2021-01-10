import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public tasktString:string;
  public addtString:string;
  public profiletString:string;
  public abouttString:string;
  public language:string;

  constructor(private globalization: Globalization,
    private _translate: TranslateService,) {}


  //Lenguaje

  _initialiseTranslation(): void {
    this._translate.get('TASKT').subscribe((res: string) => {
      this.tasktString = res;
    });
    this._translate.get('ADDT').subscribe((res: string) => {
      this.addtString = res;
    });
    this._translate.get('PROFILET').subscribe((res: string) => {
      this.profiletString = res;
    });
    this._translate.get('ABOUTT').subscribe((res: string) => {
      this.abouttString = res;
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
