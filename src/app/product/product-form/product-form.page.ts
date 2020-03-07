import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../state/product.service';
import { ProductItem } from '../model';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { IonReorderGroup } from '@ionic/angular';
import { MediaItem } from 'src/app/media/model';
import { MenuService } from 'src/app/menu/state/menu.service';
import { MenuItem } from 'src/app/menu/model';

@Component({
  selector: 'product-form-page',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit, OnDestroy {

  @ViewChild(IonReorderGroup, { static: false }) reorderGroup: IonReorderGroup;

  public productItem: ProductItem = null;
  public addSub: Subscription;
  public updateSub: Subscription;

  public hasImg: boolean;
  public menus$: Observable<MenuItem[]>


  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.menus$ = this.menuService.selectAll()
    if (!this.productService.getActiveItem()) {
      this.productItem = {
        name: '',
        desc: '',
        menu: {},
        price: 0,
        amount: 0,
        status: false,
        images: [null]
      } as ProductItem;
      this.hasImg = false
    } else {
      this.productItem = JSON.parse(JSON.stringify(this.productService.getActiveItem()));
      this.hasImg = true
    }
  }


  ngOnDestroy() {
    this.productItem = null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
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

  handleMedia(mediaItem: MediaItem) {
    if (this.hasImg) {
      const index = this.productItem.images.findIndex((img) => img.fileUrl === mediaItem.fileUrl)
      if (index > -1) {
        this.productItem.images.splice(index, 1);
      } else {
        this.productItem.images.push(mediaItem);
      }
    } else {
      this.productItem.images.splice(0, 1);
      this.productItem.images.push(mediaItem);
      this.hasImg = true
    }
  }

  deleteItem(index: number) {
    this.productItem.images.splice(index, 1);
    console.log(this.productItem.images)
  }


  doReorder(ev: any) {
    this.productItem.images = ev.detail.complete(this.productItem.images);
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  async confirmDeleteItem(index: number) {
    let alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(index)
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
