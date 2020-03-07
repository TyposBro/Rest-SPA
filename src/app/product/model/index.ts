import { ID } from "@datorama/akita";
import { MediaItem } from 'src/app/media/model';
export interface ProductItem {

    id: ID,
    name: string;
    desc: string;
    menu: {};
    price: number;
    amount: number;
    status: boolean;
    images: [MediaItem]
}
