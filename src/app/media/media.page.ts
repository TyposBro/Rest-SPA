import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MediaItem } from './model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MediaService } from './state/media.service';

@Component({
  selector: 'media-page',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit, OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public mediaItems$: Observable<MediaItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private mediaService: MediaService
  ) {
    this.mediaItems$ = this.mediaService.selectAll();
  }

  ngOnInit() {
    this.mediaService.offlineInit()
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.mediaService.getItems().subscribe(res => {
      this.presentToast(`Menu data syncronized with backend!`);
    })
  }

  deleteItem(mediaItem: MediaItem) {
    this.deleteSub = this.mediaService.deleteItem(mediaItem).subscribe(res => {
      this.presentToast(`Media: ${mediaItem.fileName} is deleted!`);
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
