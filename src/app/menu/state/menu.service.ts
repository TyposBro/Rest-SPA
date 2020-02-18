import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuStore } from './menu.store';
import { MenuQuery } from './menu.query';
import { Plugins } from '@capacitor/core';
import { MenuItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class MenuService {

    private readonly apiUrl = 'http://localhost:3000/menus';
    private readonly storageKey = 'menu';

    private activeItem: MenuItem = null;

    constructor(
        private http: HttpClient,
        private store: MenuStore,
        private query: MenuQuery
    ) { }

    selectAll(): Observable<MenuItem[]> {
        return this.query.selectAll();
    }


    getActiveItem(): MenuItem {
        return this.activeItem;
    }

    setActiveItem(menuItem: MenuItem) {
        this.activeItem = menuItem;
    }

    // HTTP GET
    getItems() {
        return this.http.get<MenuItem[]>(this.apiUrl).pipe(
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
    addItem(item: MenuItem) {
        return this.http.post<MenuItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: MenuItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<MenuItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: MenuItem) {
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

    // just helper function to save latest menuItems into Local Storage
    private async saveLocalStorage() {
        await Storage.set({
            key: this.storageKey,
            value: JSON.stringify(this.query.getAll())
        });
    }




}