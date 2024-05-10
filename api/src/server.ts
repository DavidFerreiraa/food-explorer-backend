import 'dotenv/config';
import Fastify from 'fastify';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';
import { fastifyCookie } from '@fastify/cookie';
import { fastifyStatic } from '@fastify/static';
import cors from '@fastify/cors';
import { routes } from './routes';
import multer from 'fastify-multer';
import { UPLOADS_FOLDER } from './config/upload';

const fastify = Fastify({
    logger: true
})

export async function start() {
    await fastify.register(cors, {
        credentials: true,
        origin: ["http://127.0.0.1:3333", "http://localhost:3333"]
    })
    
    fastify.register(fastifyStatic, {
        root: UPLOADS_FOLDER
    });

    fastify.register(multer.contentParser);

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

    await fastify.register(fastifyCookie)

    await fastify.register(routes);

    await fastify.listen({ port: 3333})
}

start();