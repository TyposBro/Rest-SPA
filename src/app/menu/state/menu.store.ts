import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MenuItem } from '../model';

export interface MenuState extends EntityState<MenuItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'menu',
    idKey: 'id'
})
export class MenuStore extends EntityStore<MenuState> {
    constructor() { 
        super();
    }
}