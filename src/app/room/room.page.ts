import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from './state/room.service';
import { Observable, Subscription } from 'rxjs';
import { RoomItem } from './model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'room-page',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit, OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public roomItems$: Observable<RoomItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private roomService: RoomService
  ) {
    this.roomItems$ = roomService.selectAll();
  }

  ngOnInit() {
    this.roomService.offlineInit();
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.roomService.getItems().subscribe(res => {
      this.presentToast(`Room data syncronized with backend!`);
    })
  }

  showAdd() {
    this.roomService.setActiveItem(null);
    this.router.navigateByUrl('room/form');
  }


  showUpdate(roomItem: RoomItem) {
    this.roomService.setActiveItem(roomItem);
    this.router.navigateByUrl('room/form');
  }

  showTableForm(action: string, roomItem?: RoomItem) {
    if (action === 'add') {
      this.roomService.setActiveItem({
        name: '',
        seats: 0,
         status: 'free'
      } as RoomItem);
    } else {
      this.roomService.setActiveItem(roomItem);
    }
    this.router.navigateByUrl('room/form');
  }

  deleteItem(roomItem: RoomItem) {
    this.deleteSub = this.roomService.deleteItem(roomItem).subscribe(res => {
      this.presentToast(`Room: ${roomItem.name} is deleted!`);
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
