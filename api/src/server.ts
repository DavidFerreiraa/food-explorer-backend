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
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const fastify = Fastify({
    logger: true,
    trustProxy: true
})

fastify.register(multer.contentParser);

export async function start() {
    await fastify.register(fastifyCookie, {
        secret: process.env.SECRET_JWT,
    });

    await fastify.register(cors, {
        credentials: true,
        origin: [
            "https://food-explorer-frontend-tau.vercel.app:3333", //prod website
            "http://localhost:5174"
        ]
    })

    
    fastify.register(fastifyStatic, {
        root: UPLOADS_FOLDER
    });
    
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

    await fastify.register(swagger, {
        mode: 'dynamic',
        openapi: {
            info: {
                title: 'Food explorer API Documentation',
                description: 'API description',
                version: '0.1.0',
            },
            servers: [
                {
                    url: 'http://localhost:3333', // Base URL for the API
                    description: 'Development server',
                },
                {
                    url: 'https://food-explorer-frontend-tau.vercel.app:3333', // Base URL for the API
                    description: 'Production server',
                }
              ],
        },
    });

    await fastify.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
          docExpansion: 'full',
          deepLinking: false
        },
        staticCSP: true,
        transformSpecificationClone: true
    })

    fastify.register(routes);

    await fastify.listen({port: 3333, host: '0.0.0.0'})
}

start();