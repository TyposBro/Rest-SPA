import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersStore } from './orders.store';
import { OrdersQuery } from './orders.query';
import { OrdersItem } from '../model';
import { shareReplay, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly apiUrl = 'http://localhost:3000/orders';
  private readonly storageKey = 'order';

  constructor(
    private http: HttpClient,
    private store: OrdersStore,
    private query: OrdersQuery
  ) { }

  getItems() {
    return this.http.get<OrdersItem[]>(this.apiUrl).pipe(
      shareReplay(),
      tap(items => {
        if (items) {
          this.store.set(items);
          
        }
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


}
