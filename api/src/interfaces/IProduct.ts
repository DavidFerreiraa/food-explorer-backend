import { Decimal } from "@prisma/client/runtime/library";

export interface IProduct {
    title: string,
    description: string,
    price: string | Decimal,
    ingredients: string[],
    creatorId: string,
    imageFile?: any
}