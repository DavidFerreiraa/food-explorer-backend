import { Order } from "@prisma/client";
import { prisma } from "../lib/prisma";

export interface ICreateOrder {
    totalPrice: number,
    quantity: number,
    productId: string,
    ownerId: string
}

export class OrdersRepository {
    async index(ownerId: string): Promise< Order[] | null>{
        const orders = await prisma.order.findMany({
            where: {
                ownerId
            }
        });

        return orders;
    }

    async findById(id: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            where: {
                id
            }
        })

        return order;
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
}