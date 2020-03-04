import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaStore, MediaState } from './media.store';
import { MediaQuery } from './media.query';
import { Plugins } from '@capacitor/core';
import { MediaItem } from './../model';
import { Observable, throwError, of } from 'rxjs';
import { shareReplay, tap, catchError, switchMap } from 'rxjs/operators';
const { Storage } = Plugins;

// import { AkitaFilter, AkitaFiltersPlugin } from 'akita-filters-plugin';

@Injectable({ providedIn: 'root' })
export class MediaService {

    private readonly apiUrl = 'http://localhost:3000/media';
    private readonly storageKey = 'media';

    private activeItem: MediaItem = null;

    // private filter: AkitaFiltersPlugin<MediaState, MediaItem>;

    constructor(
        private http: HttpClient,
        private store: MediaStore,
        private query: MediaQuery
    ) {
        // this.filter = new AkitaFiltersPlugin<MediaState, any>(this.query);
    }

    // Selected active MediaItems
    setActive(mediaItems: MediaItem[]) {
        const ids = mediaItems.map(item => item.id);
        this.store.setActive(ids);
    }

    selectActive() {
        return this.query.selectActive()
    }

    getActive() {
        return this.query.getActive();
    }

    // 
    selectAll(): Observable<MediaItem[]> {
        return this.query.selectAll();
    }

    selectCount(): Observable<number> {
        return this.query.selectCount();
    }

    // Filtering
    // selectAllByFilters(): Observable<MediaItem[]> {
    //     // @ts-ignore zs it was not an hashMap with not asObject
    //     return this.filter.selectAllByFilters();
    // }

    // selectCountByFilters(): Observable<number> {
    //     // @ts-ignore zs 
    //     return this.filter.selectAllByFilters().pipe(
    //         switchMap(items => of(items.length))
    //     );
    // }

    // setFilter(f: AkitaFilter<MediaItem, MediaState>): void {
    //     this.filter.setFilter(f);
    // }

    // removeFilter(id: string) {
    //     this.filter.removeFilter(id);
    // }

    // removeAll() {
    //     this.filter.clearFilters();
    // }

    // getFilterValue(id: string): any | null {
    //     return this.filter.getFilterValue(id);
    // }

    // selectFilters(): Observable<AkitaFilter<MediaItem, MediaState>[]> {
    //     return this.filter.selectFilters();
    // }

    // HTTP GET
    getItems() {
        return this.http.get<MediaItem[]>(this.apiUrl).pipe(
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
    uploadItems(formData: FormData) {
        return this.http.post<MediaItem[]>(this.apiUrl+'/upload', formData).pipe(
            shareReplay(),
            tap((newItems: MediaItem[]) => {
                this.store.add(newItems);
                this.saveLocalStorage();
            }),
            catchError(error => throwError(error))
        );
    }

    // HTTP DELETE
    deleteItem(mediaItem: MediaItem) {
        const url = this.apiUrl + '/' + mediaItem.id;
        return this.http.delete(url).pipe(
            shareReplay(),
            tap((deletedItem: any) => {
                this.store.remove(deletedItem._id);
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

    // just helper function to save latest MediaItems into Local Storage
    private async saveLocalStorage() {
        await Storage.set({
            key: this.storageKey,
            value: JSON.stringify(this.query.getAll())
        });
    }


}