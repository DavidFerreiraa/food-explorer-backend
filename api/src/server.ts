import Fastify from 'fastify';
import { AppError } from '../utils/AppError';

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
        } else {
            console.log(error);

            return reply.code(500).send({
                type: "Server error",
                message: "An error ocurred with the application server.\n Contact the support for help."
            })
        }
    })

    await fastify.listen({ port: 3333})
}

start();