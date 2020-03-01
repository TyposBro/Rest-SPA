import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserItem } from '../model';

export interface UserState extends EntityState<UserItem> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'user',
    idKey: 'id'
})
export class UserStore extends EntityStore<UserState> {
    constructor() { 
        super();
    }
}