import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  langmenu: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS:AuthService,
    public translate:TranslateService
  ) {
    // this.translate.addLangs(['es','en']);
    // this.translate.setDefaultLang('es');
    // this.translate.use('es');
    this.initializeApp();
    
    this.langmenu = (environment.defaultLanguage == "es" ? false : true);
   
    
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authS.init();
      
      // this.translate.addLangs(['es','en']);
      // this.translate.setDefaultLang('es');
      // this.translate.use('es');


      this.translate.addLangs(environment.currentLanguages);  //add all languages
      this.translate.setDefaultLang(environment.defaultLanguage); //use default language
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }




      this.checkDarkTheme();
    });
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
      document.body.classList.toggle('dark');
    }

    
  }

  // changeLang(e) {
  //   //console.log(e.detail.checked);
  //   if (e.detail.checked) {
      
  //     this.translate.use("en");
  //   } else {
     
  //     this.translate.use("es");
  //   }
  // }

  // changeLang(lang:string){
  //   this.translate.use(lang);
  // }

}
