import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ProductService } from "./state/product.service";
import { ProductItem } from './model';


@Component({
  selector: 'product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;


  public productItems$: Observable<ProductItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private productService: ProductService,
    private alertCtrl: AlertController,
  ) {
    this.productItems$ = productService.selectAll();
  }


  public network: boolean = navigator.onLine;

  ngOnInit() {

    if (this.network) {
      this.sync()
      console.log(this.network);
    } else {
      this.productService.offlineInit();
      console.log(this.network);
    }




  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.productService.getItems().subscribe(res => {
      this.presentToast(`Product data syncronized with backend!`);
    })
  }

  showAdd() {
    this.productService.setActiveItem(null);
    this.router.navigateByUrl('product/form');
  }


  showUpdate(productItem: ProductItem) {
    this.productService.setActiveItem(productItem);
    this.router.navigateByUrl('product/form');
  }

  showTableForm(action: string, productItem?: ProductItem) {
    if (action === 'add') {
      this.productService.setActiveItem({
        name: '',
        desc: '',
        menu: {},
        price: 0,
        amount: 0,
        status: true,
        images: []
      } as ProductItem);
    } else {
      this.productService.setActiveItem(productItem);
    }
    this.router.navigateByUrl('product/form');
  }

  deleteItem(productItem: ProductItem) {

    this.deleteSub = this.productService.deleteItem(productItem).subscribe(res => {
      this.presentToast(`Product: ${productItem.name} is deleted!`);
    });

  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  async confirmDeleteItem(productItem) {
    let alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(productItem)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

}
