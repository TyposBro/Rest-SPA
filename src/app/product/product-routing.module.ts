import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';
import { ProductFormPage } from './product-form/product-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'form',
    component: ProductFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule { }
