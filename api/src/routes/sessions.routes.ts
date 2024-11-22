import { FastifyInstance } from "fastify";
import { SessionsController } from "../controllers/SessionsController";
import { postSessionsCreate } from "../swagger/sessions";

export async function sessionsRoutes(fastify: FastifyInstance) {
    const sessionsController = new SessionsController();

    fastify.post("/sessions", postSessionsCreate, async (request, reply) => await sessionsController.create(request, reply));
}