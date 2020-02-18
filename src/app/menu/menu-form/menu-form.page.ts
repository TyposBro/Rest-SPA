import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MenuService } from '../state/menu.service';
import { Subscription } from 'rxjs';
import { MenuItem } from '../model';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-form-page',
  templateUrl: './menu-form.page.html',
  styleUrls: ['./menu-form.page.scss'],
})
export class MenuFormPage implements OnInit, OnDestroy {

  addSub: Subscription = null;
  updateSub: Subscription = null;

  public menuItem: MenuItem = null;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    if(!this.menuService.getActiveItem()) {
      this.menuItem = {
        name: '',
        status: true
      } as MenuItem;
    } else {
      this.menuItem = { ...this.menuService.getActiveItem() };
    }

  }

  ngOnDestroy() {
    this.menuItem = null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
  }

  save() {
    if (!this.menuService.getActiveItem()) {
      this.addSub = this.menuService.addItem(this.menuItem).subscribe(res => {
        this.router.navigateByUrl('/menu');
        this.presentToast(`Menu: ${this.menuItem.name} is added!`);
      });
    } else {
      this.updateSub = this.menuService.updateItem(this.menuItem).subscribe(res => {
        this.presentToast(`Menu: ${this.menuItem.name} is updated!`);
        this.router.navigateByUrl('/menu');
      })
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
