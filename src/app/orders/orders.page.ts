import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrdersItem } from './model';
import { Router } from '@angular/router';
import { OrdersService } from './state/orders.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'orders-page',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;
  

  public ordersItems$: Observable<OrdersItem[]>;

  constructor(
    public router:Router,
    public toastCtrl: ToastController,
    public ordersService:OrdersService
  ) { 
    this.ordersItems$=ordersService.getItems();
    // this.ordersItems$.subscribe(
    //   (elem)=>{
    //     this.qwerty = elem[0]
    //     console.log(elem);
        
    //   }
    // )
  }

  ngOnInit() {
    this.ordersService.offlineInit();
  }

  ngOnDestroy(){
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.ordersService.getItems().subscribe(res => {
      this.presentToast(`Order data syncronized with backend!`);
    })
  }

  showMore() {
       this.router.navigateByUrl('orders/more');
  }
  
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }



}
