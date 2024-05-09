import { Decimal } from "@prisma/client/runtime/library";

export interface IProduct {
    title: string,
    description: string,
    price: string | Decimal,
    creatorId: string,
    imageFile?: any
}