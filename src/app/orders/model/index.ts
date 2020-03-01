import { ID } from "@datorama/akita";


export interface OrdersItem {
          ID: ID;
          table: {
            id: number,
            name: string,
            seats: number,
            status: string,
            images: []
          },
          room: {
            id: number,
            name: string,
            seats: number,
            status: string,
            images: []
          },
          people: number,
          checkin: Date,
          checkout: Date,
          assigned: {
            id: number,
            username: string,
            firstname: string,
            lastname: string
          },
          items: [
            {
              id: number,
              item: {
                id: number,
                name: string,
                desc: string,
                menu: {
                  id: number,
                  name: string,
                  status: boolean,
                  image: []
                },
                price: number,
                amount: number,
                status: boolean,
                images: [ ]
              },
              quantity: number,
              total: number
            }
          ],
          status: string,
          payment: string,
          total: number
        }
      
    
