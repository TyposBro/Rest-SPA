import { ID } from "@datorama/akita";

export interface RoomItem {
    id: ID,
    name: string;
    seats: number;
    status: string;
    images: string[]
}