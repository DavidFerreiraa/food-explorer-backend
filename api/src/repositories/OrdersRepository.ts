import { Order, Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IOrderStatus } from "../interfaces/IOrder";

export interface ICreateOrder {
    totalPrice: number,
    quantity: number,
    productId: string,
    ownerId: string
}

export class OrdersRepository {
    async indexAdmin(): Promise< Order[] | null> {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderProducts: {
                    include: {
                        Product: true
                    }
                }
            }
        });

        return orders;
    }

    async index(ownerId: string): Promise< Order[] | null>{
        const orders = await prisma.order.findMany({
            where: {
                ownerId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderProducts: {
                    include: {
                        Product: true
                    }
                }
            }
        });

        return orders;
    }

    async findById(id: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                OrderProducts: {
                    include: {
                        Product: true
                    }
                }
            }
        })

        return order;
    }

    async findProductById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                OrderProducts: {
                    include: {
                        Product: true
                    }
                }
            }
        })

        return product;
    }

    async create({ totalPrice, quantity, ownerId, productId }: ICreateOrder): Promise<Order | null> {
        const order = await prisma.order.create({data: {
            totalPrice,
            ownerId,
            OrderProducts: {
                create: {
                    quantity,
                    productId
                }
            }
        }})

        return order;
    }

    async updateStatus(id: string, status: IOrderStatus): Promise<Order | null> {
        const order = await prisma.order.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        return order;
    }

    async delete(id: string) {
        await prisma.order.delete({
            where: {
                id
            }
        })
    }
}