import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaSelectFormComponent } from './components/media-select-form/media-selector.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MediaSelectFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  exports: [
    MediaSelectFormComponent
  ]
})
export class SharedModule { }
