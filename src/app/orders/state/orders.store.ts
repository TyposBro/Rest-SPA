import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OrdersItem } from '../model';

export interface OrdersState extends EntityState<OrdersItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'order',
    idKey: 'id'
})
export class OrdersStore extends EntityStore<OrdersState> {
    constructor() { 
        super();
    }
}