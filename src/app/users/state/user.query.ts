import { QueryEntity } from '@datorama/akita';
import { UserState, UserStore } from './user.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {
    constructor(protected store: UserStore) {
        super(store);
    }
}