import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStore } from './user.store';
import { UserQuery } from './user.query';
import { UserItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000/users';
    private readonly storageKey = 'user';

    private activeItem: UserItem = null;

  constructor(
    private http:HttpClient,
    private store:UserStore,
    private query:UserQuery
  ) { }

  selectAll(): Observable<UserItem[]> {
          return this.query.selectAll();
        }
  getActiveItem(): UserItem {
            return this.activeItem;
        }
    
   setActiveItem(userItem: UserItem) {
            this.activeItem = userItem;
        }

  //HTTP GET
    getItems() {
        return this.http.get<UserItem[]>(this.apiUrl).pipe(
            shareReplay(),
            tap(items => {
                if (items) {
                    this.store.set(items);
                    this.saveLocalStorage();
                }
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP POST
    addItem(item: UserItem) {
        return this.http.post<UserItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: UserItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<UserItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: UserItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.delete(url).pipe(
            shareReplay(),
            tap((deletedItem: any) => {
                this.store.remove(item.id);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // READ FROM LOCAL STORAGE
    async offlineInit() {
        try {
            const { value } = await Storage.get({ key: this.storageKey });
            const items = JSON.parse(value);
            this.store.set(items);
        } catch (error) {
            // do nothing for now
        }
    }

    // just helper function to save latest tableItems into Local Storage
    private async saveLocalStorage() {
        await Storage.set({
            key: this.storageKey,
            value: JSON.stringify(this.query.getAll())
        });
    }
  }
