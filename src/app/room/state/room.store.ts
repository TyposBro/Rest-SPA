import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RoomItem } from '../model';

export interface RoomState extends EntityState<RoomItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'room',
    idKey: 'id'
})
export class RoomStore extends EntityStore<RoomState> {
    constructor() { 
        super();
    }
}