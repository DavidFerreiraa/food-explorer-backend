import { FastifyInstance } from "fastify";
import { SessionsController } from "../controllers/SessionsController";

export async function sessionsRoutes(fastify: FastifyInstance) {
    const sessionsController = new SessionsController();

    fastify.post("/sessions", async (request, reply) => await sessionsController.create(request, reply));
}