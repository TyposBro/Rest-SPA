import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Tables',
      url: '/table',
      icon: 'apps'
    },
    {
      title: 'Rooms',
      url: '/room',
      icon: 'apps'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'menu'
    },
    {
      title: 'Reservation',
      url: '/reservation',
      icon: 'apps'
    },
    {
      title: 'Products',
      url: '/product',
      icon: "???"
    },
    {
      title: 'Users',
      url: '/user',
      icon: 'contact'
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: 'checkmark'
    }
  ];
}
