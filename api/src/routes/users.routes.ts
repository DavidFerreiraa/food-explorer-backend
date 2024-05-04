import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UsersController";

export async function usersRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.post("/users", async (request, reply) => await userController.create(request, reply));
}