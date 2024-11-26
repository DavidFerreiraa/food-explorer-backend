import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController";
import { authenticated } from "../middleware/authenticated";
import { deleteOrders, getOrdersIndex, getOrdersShow, patchOrderUpdateStatus, postOrdersCreate } from "../swagger/orders";
import { authorized } from "../middleware/authorized";

export async function ordersRoutes(fastify: FastifyInstance) {
    const orderController = new OrderController();

    fastify.post("/orders/:productId", {...postOrdersCreate, preHandler: [authenticated]}, async (request, reply) => await orderController.create(request, reply));
    fastify.patch("/orders/:orderId/status", {...patchOrderUpdateStatus, preHandler: [authenticated, authorized(["ADMIN"])]}, async (request, reply) => await orderController.updateStatus(request, reply));
    fastify.get("/orders", {...getOrdersIndex, preHandler: [authenticated]}, async (request, reply) => await orderController.index(request, reply));
    fastify.get("/orders/:orderId", {...getOrdersShow, preHandler: [authenticated]}, async (request, reply) => await orderController.show(request, reply));
    fastify.delete("/orders/:orderId", {...deleteOrders, preHandler: [authenticated]}, async (request, reply) => await orderController.delete(request, reply));
}