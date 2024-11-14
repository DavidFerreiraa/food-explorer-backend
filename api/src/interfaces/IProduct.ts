import { Decimal } from "@prisma/client/runtime/library";

interface CategoriesInProducts {
    categoryId: string,
    createdAt: string,
    productId: string,
    updatedAt: string
}

export interface IProduct {
    id?: string,
    title: string,
    description: string,
    price: string | Decimal,
    ingredients: string[],
    Categories?: CategoriesInProducts[],
    imageUrl?: string,
    creatorId: string,
    favoritesId?: string | null,
    createdAt?: string,
    updatedAt?: string,
    imageFile?: string
}
