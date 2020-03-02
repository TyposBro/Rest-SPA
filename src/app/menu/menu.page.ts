import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from './state/menu.service';
import { Observable, Subscription } from 'rxjs';
import { MenuItem } from './model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-page',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public menuItems$: Observable<MenuItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private menuService: MenuService
  ) {
    this.menuItems$ = menuService.selectAll();
  }

  ngOnInit() {
    this.menuService.offlineInit();
    
    
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.menuService.getItems().subscribe(res => {
      this.presentToast(`Menu data syncronized with backend!`);
    })
  }

  showAdd() {
    this.menuService.setActiveItem(null);
    this.router.navigateByUrl('menu/form');
  }


  showUpdate(menuItem: MenuItem) {
    this.menuService.setActiveItem(menuItem);
    this.router.navigateByUrl('menu/form');
  }

  showMenuForm(action: string, menuItem?: MenuItem) {
    if (action === 'add') {
      this.menuService.setActiveItem({
        name: '',
        status: true
      } as MenuItem);
    } else {
      this.menuService.setActiveItem(menuItem);
    }
    this.router.navigateByUrl('menu/form');
  }

  deleteItem(menuItem: MenuItem) {
    this.deleteSub = this.menuService.deleteItem(menuItem).subscribe(res => {
      this.presentToast(`Menu: ${menuItem.name} is deleted!`);
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
