import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationPage } from './reservation.page';
import { ReservFormPage } from './reserv-form/reserv-form.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  },
  {
    path: 'form',
    component: ReservFormPage
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationPageRoutingModule {}
