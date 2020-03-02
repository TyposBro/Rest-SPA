import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomStore } from './room.store';
import { RoomQuery } from './room.query';
import { Plugins } from '@capacitor/core';
import { RoomItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class RoomService {

    private readonly apiUrl = 'http://localhost:3000/rooms';
    private readonly storageKey = 'room';

    private activeItem: RoomItem = null;

    constructor(
        private http: HttpClient,
        private store: RoomStore,
        private query: RoomQuery
    ) { }

    selectAll(): Observable<RoomItem[]> {
        return this.query.selectAll();
    }


    getActiveItem(): RoomItem {
        return this.activeItem;
    }

    setActiveItem(tableItem: RoomItem) {
        this.activeItem = tableItem;
    }

    // HTTP GET
    getItems() {
        return this.http.get<RoomItem[]>(this.apiUrl).pipe(
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
    addItem(item: RoomItem) {
        return this.http.post<RoomItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: RoomItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<RoomItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: RoomItem) {
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