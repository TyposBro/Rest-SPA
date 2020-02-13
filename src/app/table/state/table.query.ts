import { QueryEntity } from '@datorama/akita';
import { TableState, TableStore } from './table.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TableQuery extends QueryEntity<TableState> {
    constructor(protected store: TableStore) {
        super(store);
    }
}