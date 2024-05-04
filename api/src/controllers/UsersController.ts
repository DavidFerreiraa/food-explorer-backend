import { FastifyReply, FastifyRequest } from "fastify";
import { createUserBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService } from "../services/UserCreateService";
import { AppError } from "../../utils/AppError";
import { ZodError } from "zod";

export class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, email, password } = createUserBody.parse(request.body);

            const userRepository = new UserRepository();
            const userCreateService = new UserCreateService(userRepository);
    
            await userCreateService.execute({name, email, password});
    
            return reply.status(201).send();

        } catch (error) {
            if (error instanceof ZodError) {
                error.issues.map(issue => {
                    throw new AppError({message: issue.message, statusCode: 409})
                })
            }
        }

        return reply.status(500).send();
    }
}