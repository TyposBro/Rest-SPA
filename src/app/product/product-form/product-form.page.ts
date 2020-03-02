import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../state/product.service';
import { ProductItem } from '../model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'product-form-page',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit, OnDestroy {

  public productItem: ProductItem = null;
  public addSub: Subscription;
  public updateSub: Subscription;


  constructor(
    private productService: ProductService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    if (!this.productService.getActiveItem()) {
      this.productItem = {
        name: '',
        desc: '',
        menu: {},
        price: 0,
        amount: 0,
        status: false,
        images: []
      } as ProductItem
    } else {
      this.productItem = { ...this.productService.getActiveItem() }
    }
  }

  save() {
    if (!this.productService.getActiveItem()) {
      this.addSub = this.productService.addItem(this.productItem).subscribe((res) => {

        this.presentToast(`Product ${this.productItem.name} is added`);
        this.router.navigateByUrl('/product');
      })
    } else {
      this.updateSub = this.productService.updateItem(this.productItem).subscribe((res) => {

        this.presentToast(`Product ${this.productItem.name} is update`);
        this.router.navigateByUrl('/product');
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



  ngOnDestroy() {
    this.productItem = null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
  }
}
