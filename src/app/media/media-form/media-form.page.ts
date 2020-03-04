import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MediaService } from '../state/media.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'media-form-page',
  templateUrl: './media-form.page.html',
  styleUrls: ['./media-form.page.scss'],
})
export class MediaFormPage implements OnInit, OnDestroy {

  uploadSub: Subscription = null;

  mediaForm = new FormGroup({
    group: new FormControl('table'),
    files: new FormControl()
  });

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    private mediaService: MediaService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    (this.uploadSub) ? this.uploadSub.unsubscribe() : null;
  }

  save() {
    if (this.mediaForm.get('files') && this.mediaForm.get('files').value) {
      let formData = new FormData();
      formData.append('group', this.mediaForm.get('group').value);
      for (let i = 0; i < this.mediaForm.get('files').value.length; i++) {
        formData.append('files', this.mediaForm.get('files').value[i], this.mediaForm.get('files').value[i].name)
      }

      this.uploadSub = this.mediaService.uploadItems(formData).subscribe((res) => {
        this.presentToast('New files are added!')
        this.router.navigateByUrl('/media');
      })
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.mediaForm.get('files').setValue(event.target.files);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
