export enum IOrderStatus {
    "Pendente" = "Pendente",
    "Pago" = "Pago",
    "Preparando" = "Preparando",
    "Entregue" = "Entregue"
}

export interface IOrder {
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    totalPrice: number | null,
    quantity: number | null,
    productId: string,
    ownerId: string
    status?: IOrderStatus
}