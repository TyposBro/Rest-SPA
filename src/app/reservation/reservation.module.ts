import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';
import { ReservFormPage } from './reserv-form/reserv-form.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationPageRoutingModule,
    MaterialModule
  ],
  declarations: [ReservationPage,ReservFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationPageModule {}
