import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { ProductItem } from "../model";

export interface ProductState extends EntityState<ProductItem> { }

@Injectable({ providedIn: "root" })
@StoreConfig({
    name: "product",
    idKey: "id"
})

export class ProductStore extends EntityStore<ProductState>{
    constructor() {
        super();
    }
}





// export class TableStore extends EntityStore<TableState> {
//     constructor() {
//         super();
//     }
// }
