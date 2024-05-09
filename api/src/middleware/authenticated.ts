import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, MyJwtPayload } from "fastify";
import { AppError } from "../../utils/AppError";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth";
import { $Enums } from "@prisma/client";

declare module 'fastify' {
    interface FastifyRequest {
        user: {
            id: string,
            role: $Enums.Role
        }
    }

    interface MyJwtPayload extends JwtPayload {
        role: $Enums.Role
    }
}

export function authenticated(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction){
    const headers = request.headers;

    if (!headers.cookie) {
        throw new AppError({ message: "JWT is missing", statusCode: 401});
    }

    const [, token] = headers.cookie.split("token=");

    try {
        const {sub: user_id, role} = jwt.verify(token, auth.jwt.secret) as MyJwtPayload;

        if (!user_id) {
            throw new AppError({ message: "Can't verify JWT token", statusCode: 401})
        }

        request.user = {
            id: user_id,
            role
        }

        return done();
    } catch (error) {
        throw new AppError({ message: "Invalid JWT token", statusCode: 401})
    }
}