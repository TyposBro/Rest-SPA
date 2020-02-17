import { QueryEntity } from '@datorama/akita';
import { RoomState, RoomStore } from './room.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoomQuery extends QueryEntity<RoomState> {
    constructor(protected store: RoomStore) {
        super(store);
    }
}