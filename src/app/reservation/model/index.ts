import { ID } from "@datorama/akita";

export interface ReservationItem {
    id: ID,
    table: Object;
    room: Object;
    startTime: Date;
    endTime: Date,
    reference: string
}