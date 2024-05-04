import { FastifyInstance } from "fastify";
import { createUserBody } from "../../utils/ZodTemplates";

export async function usersRoutes(fastify: FastifyInstance) {
    fastify.post("/users", async (request, reply) => {
        const {name, email, password} = createUserBody.parse(request);
        
    })
}