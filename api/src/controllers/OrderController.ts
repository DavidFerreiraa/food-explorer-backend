import { FastifyReply, FastifyRequest } from "fastify";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { OrderCreateService } from "../services/OrderCreateService";
import { createOrderBody, createOrderId, createProductId } from "../../utils/ZodTemplates";
import { OrderDeleteService } from "../services/OrderDeleteService";
import { OrderShowService } from "../services/OrderShowService";

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

        const orderShowService = new OrderShowService(this.orderRepository);
        const order = orderShowService.execute(orderId, ownerId);

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

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { orderId } = createOrderId.parse(request.params);
        const ownerId = request.user.id;

        const orderDeleteService = new OrderDeleteService(this.orderRepository);
        await orderDeleteService.execute(orderId, ownerId);

        return reply.status(200).send({
            type: "success",
            message: "order successfully deleted"
        })
    }
}