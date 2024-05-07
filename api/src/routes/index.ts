import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { categoriesRoutes } from "./categories.routes";

export async function routes(fastify: FastifyInstance) {
    await fastify.register(usersRoutes);
    await fastify.register(sessionsRoutes);
    await fastify.register(categoriesRoutes);
}