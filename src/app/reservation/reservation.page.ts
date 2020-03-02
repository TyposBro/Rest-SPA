import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ReservationService } from './state/reservation.service';
import { Observable, Subscription } from 'rxjs';
import { ReservationItem } from './model';
import { ToastController, IonItemDivider } from '@ionic/angular';
import { Router, Data } from '@angular/router';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { find } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReservationPage implements OnInit, OnDestroy {
  public data: Data;
  public columns: any;
  public rows: any;

  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public reservationItems$: Observable<ReservationItem[]>;
  public table: object;
  constructor(
    private http: HttpClient,
    public router: Router,
    public toastCtrl: ToastController,
    private reservationService: ReservationService
  ) {
    this.reservationItems$ = reservationService.selectAll();
  }

  ngOnInit() {
    this.reservationService.offlineInit();
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.reservationService.getItems().subscribe(res => {
      this.presentToast(`Reservation data syncronized with backend!`);
    })
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
