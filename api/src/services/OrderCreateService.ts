import { Order } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { IOrder } from "../interfaces/IOrder";

export class OrderCreateService {
    ordersRepository;

    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }

    async execute({ totalPrice, quantity, ownerId, productId }: IOrder): Promise<Order | null>{

        const orderExists = await this.ordersRepository.findById(productId);

        if (orderExists) {
            throw new AppError({ message: "This order already exists", statusCode: 409 });
        }

        if (totalPrice === null || quantity === null) {
            throw new AppError({ message: "The fields total price and quantity should be numbers only", statusCode: 400 });
        }

        const createdOrder = await this.ordersRepository.create({ totalPrice, quantity, ownerId, productId });

        return createdOrder;
    }
}