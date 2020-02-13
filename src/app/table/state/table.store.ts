import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TableItem } from '../model';

export interface TableState extends EntityState<TableItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'table',
    idKey: 'id'
})
export class TableStore extends EntityStore<TableState> {
    constructor() { 
        super();
    }
}