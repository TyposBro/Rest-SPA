import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RoomService } from '../state/room.service';
import { Subscription } from 'rxjs';
import { RoomItem } from '../model';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'room-form-page',
  templateUrl: './room-form.page.html',
  styleUrls: ['./room-form.page.scss'],
})
export class RoomFormPage implements OnInit, OnDestroy {

  addSub: Subscription = null;
  updateSub: Subscription = null;

  public roomItem: RoomItem = null;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    if(!this.roomService.getActiveItem()) {
      this.roomItem = {
        name: '',
        seats: 0,
        status: 'free'
      } as RoomItem;
    } else {
      this.roomItem = { ...this.roomService.getActiveItem() };
    }

  }

  ngOnDestroy() {
    this.roomItem = null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
  }

  save() {
    if (!this.roomService.getActiveItem()) {
      this.addSub = this.roomService.addItem(this.roomItem).subscribe(res => {
        this.router.navigateByUrl('/room');
        this.presentToast(`Room: ${this.roomItem.name} is added!`);
      });
    } else {
      this.updateSub = this.roomService.updateItem(this.roomItem).subscribe(res => {
        this.presentToast(`Room: ${this.roomItem.name} is updated!`);
        this.router.navigateByUrl('/room');
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
