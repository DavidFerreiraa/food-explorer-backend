import { FastifyInstance } from "fastify";
import { createProductImageUrl } from "../../utils/ZodTemplates";
import { getProductImage } from "../swagger/files";

export async function filesRoutes(fastify: FastifyInstance) {

    fastify.get("/files/:productImageUrl", getProductImage, async (request, reply) => {
        const { productImageUrl } = createProductImageUrl.parse(request.params);
        
        return reply.sendFile(productImageUrl);
    });
}