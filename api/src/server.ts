import Fastify from 'fastify';

const server = Fastify({
    logger: true
})

export async function start() {
    try {
        await server.listen({ port: 3333 })
    } catch (error) {
        throw error
    }
}

start();