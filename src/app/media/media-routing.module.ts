import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaPage } from './media.page';
import { MediaFormPage } from './media-form/media-form.page';

const routes: Routes = [
  {
    path: '',
    component: MediaPage
  },
  {
    path: 'form',
    component: MediaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPageRoutingModule {}
