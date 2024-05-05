import 'dotenv/config';
import Fastify from 'fastify';
import { AppError } from '../utils/AppError';
import { usersRoutes } from './routes/users.routes';
import { ZodError } from 'zod';
import { fastifyCookie } from '@fastify/cookie';

const fastify = Fastify({
    logger: true
})

export async function start() {
    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof AppError) {
            return reply.code(error.statusCode).send({
                type: "App error",
                message: error.message
            })
        } else if (error instanceof ZodError) {
            return reply.code(400).send({
                type: "Bad request",
                message: "A bad request error was returned",
                details: error.issues
            })
        } else {
            console.log(error);

            return reply.code(500).send({
                type: "Server error",
                message: "An error ocurred with the application server.\n Contact the support for help."
            })
        }
    });

    fastify.register(fastifyCookie)

    await fastify.register(usersRoutes);

    await fastify.listen({ port: 3333})
}

start();