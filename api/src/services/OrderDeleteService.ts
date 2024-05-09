import { AppError } from "../../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrderDeleteService {
    ordersRepository;

    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }

    async execute(orderId: string, ownerId: string) {
        const order = await this.ordersRepository.findById(orderId);

        if (!order) {
            throw new AppError({message: "This order don't exists", statusCode: 404})
        }

        if(!(order.ownerId === ownerId)) {
            throw new AppError({message: "Unauthorized", statusCode: 409})
        }

        this.ordersRepository.delete(orderId);
    }
}