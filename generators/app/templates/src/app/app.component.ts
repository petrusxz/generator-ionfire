import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  pages: Array<{ title: string, component: string, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // Sidemenu buttons
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'Sair', component: 'LoginPage', icon: 'exit' }
    ];
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  openPage(page): void {
    this.nav.setRoot(page.component);
  }
}
