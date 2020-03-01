import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import { OrderPage } from './order/order-page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'more',
    component: OrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
