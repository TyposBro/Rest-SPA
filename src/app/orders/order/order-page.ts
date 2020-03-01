import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OrdersService } from '../state/orders.service';
import { OrdersItem } from '../model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'order-page',
  templateUrl: './order-page.html',
  styleUrls: ['./order-page.scss'],
})
export class OrderPage implements OnInit {

  syncSub: Subscription = null;

  public orderItems$: Observable<OrdersItem[]>;

  constructor(
    public router:Router,
    public toastCtrl: ToastController,
    public ordersService:OrdersService
  ) {
    this.orderItems$=ordersService.getItems();
    }

  ngOnInit() {
    this.ordersService.offlineInit();
  }

  
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
