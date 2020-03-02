import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { MenuFormPage } from './menu-form/menu-form.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'form',
    component: MenuFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
