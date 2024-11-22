import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UsersController";
import { postUserSchema } from "../swagger/user";

export async function usersRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.post("/users", postUserSchema, async (request, reply) => await userController.create(request, reply));
}