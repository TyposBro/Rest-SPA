import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePage } from './table.page';
import { TableFormPage } from './table-form/table-form.page';

const routes: Routes = [
  {
    path: '',
    component: TablePage
  },
  {
    path: 'form',
    component: TableFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
