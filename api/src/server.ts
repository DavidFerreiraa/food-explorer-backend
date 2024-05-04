import Fastify from 'fastify';
import { z } from 'zod';
import { AppError } from '../utils/AppError';

const fastify = Fastify({
    logger: true
})

fastify.post("/users", (request, reply) => {
    const createUserBody = z.object({
        name: z.string({required_error: "You forgot to insert a name"}),
        email: z.string({required_error: "You forgot to insert a email"}).email({message: "Check if it's really an e-mail"}),
        password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Must be 6 or more characters long."})
    })

    const { name, email, password } = createUserBody.parse(request.body);

    
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