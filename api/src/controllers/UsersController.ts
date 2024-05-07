import { FastifyReply, FastifyRequest } from "fastify";
import { createUserBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService } from "../services/UserCreateService";

export class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = createUserBody.parse(request.body);

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute({name, email, password});

        return reply.status(201).send();
    }
}