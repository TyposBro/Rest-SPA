import { QueryEntity } from '@datorama/akita';
import { MenuState, MenuStore } from './menu.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuQuery extends QueryEntity<MenuState> {
    constructor(protected store: MenuStore) {
        super(store);
    }
}