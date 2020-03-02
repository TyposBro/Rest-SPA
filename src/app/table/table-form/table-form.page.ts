import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TableService } from '../state/table.service';
import { Subscription } from 'rxjs';
import { TableItem } from '../model';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'table-form-page',
  templateUrl: './table-form.page.html',
  styleUrls: ['./table-form.page.scss'],
})
export class TableFormPage implements OnInit, OnDestroy {

  addSub: Subscription = null;
  updateSub: Subscription = null;

  public tableItem: TableItem = null;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private tableService: TableService
  ) { }

  ngOnInit() {
    if (!this.tableService.getActiveItem()) {
      this.tableItem = {
        name: '',
        seats: 0,
        status: 'free'
      } as TableItem;
    } else {
      this.tableItem = { ...this.tableService.getActiveItem() };
    }

    const slideOpts = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: true
    };
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
}
