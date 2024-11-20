import { Order } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { IOrder, IOrderStatus } from "../interfaces/IOrder";

export class OrderStatusUpdateService {
    ordersRepository;

    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }

    async execute(id: string, status: string | undefined): Promise<Order | null>{

        if(!id) {
            throw new AppError({ message: "Order id is missing", statusCode: 404 });
        }

        if (!status) {
            throw new AppError({ message: "Order status is missing", statusCode: 404 });
        }

        let validStatus = false;

        switch(status) {
            case IOrderStatus.Pendente:
                validStatus = true;
                break;
            case IOrderStatus.Pago:
                validStatus = true;
                break;
            case IOrderStatus.Preparando:
                validStatus = true;
                break;
            case IOrderStatus.Entregue:
                validStatus = true;
                break;
            default:
                throw new AppError({ message: "Invalid order status", statusCode: 400 });
        }

        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new AppError({ message: "This order don't exists", statusCode: 404 });
        }

        const updatedOrder = await this.ordersRepository.updateStatus(order.id, status);

        return updatedOrder;
    }
}