import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { TableService } from '../state/table.service';
import { Subscription } from 'rxjs';
import { TableItem } from '../model';
import { IonReorderGroup } from '@ionic/angular';
import { Router } from '@angular/router';
import { MediaItem } from 'src/app/media/model';

@Component({
  selector: 'table-form-page',
  templateUrl: './table-form.page.html',
  styleUrls: ['./table-form.page.scss'],
})
export class TableFormPage implements OnInit, OnDestroy {

  @ViewChild(IonReorderGroup, { static: false }) reorderGroup: IonReorderGroup;

  addSub: Subscription = null;
  updateSub: Subscription = null;

  public tableItem: TableItem = null;
  public hasImg: boolean;


  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private tableService: TableService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    if (!this.tableService.getActiveItem()) {
      this.tableItem = {
        name: '',
        seats: 0,
        status: 'free',
        images: [null]
      } as TableItem;
      this.hasImg = false;
    } else {
      this.tableItem = JSON.parse(JSON.stringify(this.tableService.getActiveItem()))
      this.hasImg = true;
    }
  }

  ngOnDestroy() {
    this.tableItem = null;
    (this.updateSub) ? this.updateSub.unsubscribe() : null;
    (this.addSub) ? this.addSub.unsubscribe() : null;
  }

  save() {
    if (!this.tableService.getActiveItem()) {
      this.addSub = this.tableService.addItem(this.tableItem).subscribe(res => {
        console.log("AddItem");
        this.router.navigateByUrl('/table');
        this.presentToast(`Table: ${this.tableItem.name} is added!`);
      });
    } else {
      this.updateSub = this.tableService.updateItem(this.tableItem).subscribe(res => {
        this.presentToast(`Table: ${this.tableItem.name} is updated!`);
        this.router.navigateByUrl('/table');
        console.log("UpdateItem");
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
      const index = this.tableItem.images.findIndex((img) => img.fileUrl === mediaItem.fileUrl)
      if (index > -1) {
        this.tableItem.images.splice(index, 1);
      } else {
        this.tableItem.images.push(mediaItem);
      }
    } else {
      this.tableItem.images.splice(0, 1);
      this.tableItem.images.push(mediaItem);
      this.hasImg = true
    }
  }

  deleteItem(index: number) {
    this.tableItem.images.splice(index, 1);
    console.log(this.tableItem.images)
  }

  doReorder(ev: any) {
    this.tableItem.images = ev.detail.complete(this.tableItem.images);
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
