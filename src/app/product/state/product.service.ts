import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductStore } from './product.store';
import { ProductQuery } from './product.query';
import { Plugins } from '@capacitor/core';
import { ProductItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
const { Storage } = Plugins;


@Injectable({ providedIn: 'root' })
export class ProductService {

    private readonly apiUrl = 'http://localhost:3000/products';
    private readonly storageKey = 'product';

    private activeItem: ProductItem = null;

    constructor(
        private http: HttpClient,
        private store: ProductStore,
        private query: ProductQuery
    ) { }



    selectAll(): Observable<ProductItem[]> {
        return this.query.selectAll();
    }


    getActiveItem(): ProductItem {
        return this.activeItem;
    }

    setActiveItem(productItem: ProductItem) {
        this.activeItem = productItem;
    }

    // HTTP GET
    getItems() {
        return this.http.get<ProductItem[]>(this.apiUrl).pipe(
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
    addItem(item: ProductItem) {
        return this.http.post<ProductItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: ProductItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<ProductItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: ProductItem) {
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
        // this.getItems();
        try {
            const { value } = await Storage.get({ key: this.storageKey });
            const items = JSON.parse(value);
            this.store.set(items);
        } catch (error) {
            // do nothing for now
        }


    }

    // just helper function to save latest ProductItems into Local Storage
    private async saveLocalStorage() {
        await Storage.set({
            key: this.storageKey,
            value: JSON.stringify(this.query.getAll())
        });
    }

}