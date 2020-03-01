import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ReservationItem } from '../model';

export interface ReservationState extends EntityState<ReservationItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'reservation',
    idKey: 'id'
})
export class ReservationStore extends EntityStore<ReservationState> {
    constructor() { 
        super();
    }
}