import { QueryEntity } from '@datorama/akita';
import { ReservationState, ReservationStore } from './reservation.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservationQuery extends QueryEntity<ReservationState> {
    constructor(protected store: ReservationStore) {
        super(store);
    }
}