import { ID } from "@datorama/akita";
export interface ProductItem {

    id: ID,
    name: string;
    desc: string;
    menu: {
        // id: number;
        // name: string;
        // status: boolean;
        // image: string
    };
    price: number;
    amount: number;
    status: boolean;
    images: string[]
}
