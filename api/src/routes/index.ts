import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { categoriesRoutes } from "./categories.routes";
import { productsRoutes } from "./products.routes";
import { ordersRoutes } from "./orders.routes";

export async function routes(fastify: FastifyInstance) {

    await fastify.register(usersRoutes);
    await fastify.register(sessionsRoutes);
    await fastify.register(categoriesRoutes);
    await fastify.register(productsRoutes);
    await fastify.register(ordersRoutes);
}