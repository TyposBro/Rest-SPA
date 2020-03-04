import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MediaService } from 'src/app/media/state/media.service';
import { ObservableLike, Observable } from 'rxjs';
import { MediaItem } from 'src/app/media/model';

@Component({
  selector: 'media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.scss'],
})
export class MediaSelectFormComponent implements OnInit, OnDestroy {

  @Output()
  public selectedMedia = new EventEmitter<MediaItem>();

  mediaItems$: Observable<MediaItem[]>;


  constructor(private readonly mediaService: MediaService) {
    this.mediaItems$ = this.mediaService.selectAll();
  }

  ngOnInit() { }

  ngOnDestroy() { }





}
