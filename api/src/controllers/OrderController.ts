import { FastifyReply, FastifyRequest } from "fastify";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { OrderCreateService } from "../services/OrderCreateService";
import { createOrderBody, createOrderId, createProductId } from "../../utils/ZodTemplates";
import { AppError } from "../../utils/AppError";

export class OrderController {
    orderRepository = new OrdersRepository();

    async index(request: FastifyRequest, reply: FastifyReply) {
        const ownerId = request.user.id;

        const userOrders = await this.orderRepository.index(ownerId);

        return reply.status(200).send(userOrders);
    }

    async show(request: FastifyRequest, reply: FastifyReply) {
        const ownerId = request.user.id;
        const { orderId } = createOrderId.parse(request.params);

        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new AppError({message: "This order don't exists", statusCode: 404})
        }

        if(!(order.ownerId === ownerId)) {
            throw new AppError({message: "Unauthorized", statusCode: 409})
        }

        return reply.status(200).send(order);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        let { totalPrice, quantity } = createOrderBody.parse(request.body);
        const { productId } = createProductId.parse(request.params);
        const ownerId = request.user.id

        const orderCreateService = new OrderCreateService(this.orderRepository);
        const orderCreated = await orderCreateService.execute({ totalPrice, quantity, productId, ownerId});

        return reply.status(201).send(orderCreated);
    }
}