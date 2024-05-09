export interface IOrder {
    totalPrice: number | null,
    quantity: number | null,
    productId: string,
    ownerId: string
}