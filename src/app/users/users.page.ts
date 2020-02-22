import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserItem } from './model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from './state/user.service';

@Component({
  selector: 'users-page',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {


  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public userItems$: Observable<UserItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.userItems$ = userService.selectAll();
  }

  ngOnInit() {
    this.userService.offlineInit();
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.userService.getItems().subscribe(res => {
      this.presentToast(`Table data syncronized with backend!`);
    })
  }

  showAdd() {
    this.userService.setActiveItem(null);
    this.router.navigateByUrl('user/form');
  }


  showUpdate(userItem: UserItem) {
    this.userService.setActiveItem(userItem);
    this.router.navigateByUrl('user/form');
  }

  showTableForm(action: string, userItem?: UserItem) {
    if (action === 'add') {
      this.userService.setActiveItem({
        username: '',
        firstname: '',
        lastname: '',
        password: ''
      } as UserItem);
    } else {
      this.userService.setActiveItem(userItem);
    }
    this.router.navigateByUrl('user/form');
  }

  deleteItem(userItem: UserItem) {
    this.deleteSub = this.userService.deleteItem(userItem).subscribe(res => {
      this.presentToast(`Table: ${userItem.username} is deleted!`);
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
