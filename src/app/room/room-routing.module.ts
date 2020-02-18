import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomPage } from './room.page';
import { RoomFormPage } from './room-form/room-form.page';

const routes: Routes = [
  {
    path: '',
    component: RoomPage
  },
  {
    path: 'form',
    component: RoomFormPage
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomPageRoutingModule {}
