import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MediaItem } from './../model';

export interface MediaState extends EntityState<MediaItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'media',
    idKey: 'id'
})
export class MediaStore extends EntityStore<MediaState> {
    constructor() { 
        super();
    }
}