import { QueryEntity } from '@datorama/akita';
import { MediaState, MediaStore } from './media.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaQuery extends QueryEntity<MediaState> {
    constructor(protected store: MediaStore) {
        super(store);
    }
}