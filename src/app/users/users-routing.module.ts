import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';
import { UserFormPage } from './user-form/user-form-page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'form',
    component:UserFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
