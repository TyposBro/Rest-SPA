import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableStore } from './table.store';
import { TableQuery } from './table.query';
import { Plugins } from '@capacitor/core';
import { TableItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class TableService {

    private readonly apiUrl = 'http://localhost:3000/tables';
    private readonly storageKey = 'table';

    private activeItem: TableItem = null;

    constructor(
        private http: HttpClient,
        private store: TableStore,
        private query: TableQuery
    ) { }

    selectAll(): Observable<TableItem[]> {
        return this.query.selectAll();
    }


    getActiveItem(): TableItem {
        return this.activeItem;
    }

    setActiveItem(tableItem: TableItem) {
        this.activeItem = tableItem;
    }

    // HTTP GET
    getItems() {
        return this.http.get<TableItem[]>(this.apiUrl).pipe(
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
    addItem(item: TableItem) {
        return this.http.post<TableItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: TableItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<TableItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: TableItem) {
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