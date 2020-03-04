import { ID } from "@datorama/akita";
import { MediaItem } from 'src/app/media/model';

export interface TableItem {
    id: ID,
    name: string;
    seats: number;
    status: string;
    images: [MediaItem]
}