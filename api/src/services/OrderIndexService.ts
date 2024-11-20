import { Order } from "@prisma/client";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { FastifyRequest } from "fastify";
import { AppError } from "../../utils/AppError";

export class OrderIndexService {
    ordersRepository;

    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }

    async execute(request: FastifyRequest): Promise<Order[]> {
        const ownerId = request.user.id;

        if(request.user.role == "ADMIN") {
            const allOrders = await this.ordersRepository.indexAdmin();
            if (!allOrders) {
                throw new AppError({ message: "There's no orders available", statusCode: 404 })
            }
            return allOrders;
        }

        const userOrders = await this.ordersRepository.index(ownerId);
        if (!userOrders) {
            throw new AppError({ message: "There's no orders available", statusCode: 404 })
        }
        return userOrders;
    }
}