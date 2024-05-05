import { FastifyReply, FastifyRequest } from "fastify";
import { createSessionBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { SessionsCreateService } from "../services/SessionsCreateService";

export class SessionController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = createSessionBody.parse(request);

        const userRepository = new UserRepository();
        const sessionsCreateService = new SessionsCreateService(userRepository);

        const {user, jwtToken} = await sessionsCreateService.execute({email, password});

        reply.setCookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 15*60*1000
        }).code(201).send(user);
    }
}