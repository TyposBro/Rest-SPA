import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { OrdersStore, OrdersState } from './orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersQuery extends QueryEntity<OrdersState> {
    constructor(protected store: OrdersStore) {
        super(store);
    }
}