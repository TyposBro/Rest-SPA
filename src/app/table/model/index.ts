import { ID } from "@datorama/akita";

export interface TableItem {
    id: ID,
    name: string;
    seats: number;
    status: string;
    images: string[]
}