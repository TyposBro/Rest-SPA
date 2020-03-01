import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationStore } from './reservation.store';
import { ReservationQuery } from './reservation.query';
import { Plugins } from '@capacitor/core';
import { ReservationItem } from '../model';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class ReservationService {

    private readonly apiUrl = 'http://localhost:3000/reservation';
    private readonly storageKey = 'reservation';

    private activeItem: ReservationItem = null;

    constructor(
        private http: HttpClient,
        private store: ReservationStore,
        private query: ReservationQuery
    ) { }

    selectAll(): Observable<ReservationItem[]> {
        return this.query.selectAll();
    }


    getActiveItem(): ReservationItem {
        return this.activeItem;
    }

    setActiveItem(reservationItem: ReservationItem) {
        this.activeItem = reservationItem;
    }

    // HTTP GET
    getItems() {
        return this.http.get<ReservationItem[]>(this.apiUrl).pipe(
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
    addItem(item: ReservationItem) {
        return this.http.post<ReservationItem>(this.apiUrl, item).pipe(
            shareReplay(),
            tap((newItem: any) => {
                this.store.add(newItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP PUT
    updateItem(item: ReservationItem) {
        const url = this.apiUrl + '/' + item.id;
        return this.http.put<ReservationItem>(url, item).pipe(
            shareReplay(),
            tap((updatedItem: any) => {
                this.store.update(updatedItem.id, updatedItem);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(item: ReservationItem) {
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