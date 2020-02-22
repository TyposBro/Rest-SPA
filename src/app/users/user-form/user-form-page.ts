import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserItem } from '../model';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { UserService } from '../state/user.service';

@Component({
  selector: 'user-form-page',
  templateUrl: './user-form-page.html',
  styleUrls: ['./user-form-page.scss'],
})
export class UserFormPage implements OnInit, OnDestroy {
  
  
  addSub: Subscription = null;
  updateSub: Subscription = null;

  public userItem: UserItem = null;

  constructor( 
    private router:Router,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }


  
  ngOnInit(){
    if(!this.userService.getActiveItem()) {
      this.userItem = {
        username: '',
        firstname: '',
        lastname: '',
        password: ''
      } as UserItem;
    } else {
      this.userItem = { ...this.userService.getActiveItem() };
    }

  }

    
  ngOnDestroy() {
    this.userItem = null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
  }

  save() {
    if (!this.userService.getActiveItem()) {
      this.addSub = this.userService.addItem(this.userItem).subscribe(res => {
        this.router.navigateByUrl('/user');
        this.presentToast(`User: ${this.userItem.username} is added!`);
      });
    } else {
      this.updateSub = this.userService.updateItem(this.userItem).subscribe(res => {
        this.presentToast(`User: ${this.userItem.username} is updated!`);
        this.router.navigateByUrl('/user');
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
