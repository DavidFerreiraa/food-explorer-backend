import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController";
import { authenticated } from "../middleware/authenticated";

export async function ordersRoutes(fastify: FastifyInstance) {
    const orderController = new OrderController();

    fastify.post("/orders/:productId", {preHandler: [authenticated]}, async (request, reply) => await orderController.create(request, reply));
    fastify.get("/orders", {preHandler: [authenticated]}, async (request, reply) => await orderController.index(request, reply));
    fastify.get("/orders/:orderId", {preHandler: [authenticated]}, async (request, reply) => await orderController.show(request, reply));
}