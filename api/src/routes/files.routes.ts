import { FastifyInstance } from "fastify";
import { createProductImageUrl } from "../../utils/ZodTemplates";

export async function filesRoutes(fastify: FastifyInstance) {

    fastify.get("/files/:productImageUrl", async (request, reply) => {
        const { productImageUrl } = createProductImageUrl.parse(request.params);
        
        return reply.sendFile(productImageUrl);
    });
}