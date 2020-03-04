import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MediaService } from './media/state/media.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mediaService: MediaService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.mediaService.offlineInit();

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
      icon: 'clipboard'
    },
    {
      title: 'Products',
      url: '/product',
      icon: "logo-dropbox"
    },
    {
      title: 'Users',
      url: '/user',
      icon: 'people'
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: 'checkmark'
    },
    {
      title: 'Media',
      url: '/media',
      icon: 'images'
    }
  ];
}
