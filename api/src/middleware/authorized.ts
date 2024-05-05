import { $Enums } from "@prisma/client";
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { AppError } from "../../utils/AppError";

export function authorized(roleToVerify: $Enums.Role): (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void {
    return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
        const { role } = request.user;

        if (!roleToVerify.includes(role)) {
            throw new AppError({ message: "Unauthorized", statusCode: 401});
        }

        return done();
    }
}