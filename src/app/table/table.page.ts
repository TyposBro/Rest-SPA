import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableService } from './state/table.service';
import { Observable, Subscription } from 'rxjs';
import { TableItem } from './model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'table-page',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit, OnDestroy {

  syncSub: Subscription = null;
  deleteSub: Subscription = null;

  public tableItems$: Observable<TableItem[]>;

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private tableService: TableService
  ) {
    this.tableItems$ = tableService.selectAll();
  }

  ngOnInit() {
    this.tableService.offlineInit();
  }

  ngOnDestroy() {
    (this.syncSub) ? this.syncSub.unsubscribe() : null;
    (this.deleteSub) ? this.deleteSub.unsubscribe() : null;
  }

  sync() {
    this.syncSub = this.tableService.getItems().subscribe(res => {
      this.presentToast(`Table data syncronized with backend!`);
    })
  }

  showAdd() {
    this.tableService.setActiveItem(null);
    this.router.navigateByUrl('table/form');
  }


  showUpdate(tableItem: TableItem) {
    this.tableService.setActiveItem(tableItem);
    this.router.navigateByUrl('table/form');
  }

  showTableForm(action: string, tableItem?: TableItem) {
    if (action === 'add') {
      this.tableService.setActiveItem({
        name: '',
        seats: 0,
         status: 'free'
      } as TableItem);
    } else {
      this.tableService.setActiveItem(tableItem);
    }
    this.router.navigateByUrl('table/form');
  }

  deleteItem(tableItem: TableItem) {
    this.deleteSub = this.tableService.deleteItem(tableItem).subscribe(res => {
      this.presentToast(`Table: ${tableItem.name} is deleted!`);
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
