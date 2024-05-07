import { FastifyReply, FastifyRequest } from "fastify";
import { createProductBody } from "../../utils/ZodTemplates";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductCreateService } from "../services/ProductsCreateService";
import { AppError } from "../../utils/AppError";

export class ProductsController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, price, imageUrl, categoryId, creatorId } = createProductBody.parse(request.body);

        const productsRepository = new ProductsRepository();
        const productsCreateService = new ProductCreateService(productsRepository);

        const userCreated = await productsCreateService.execute({ title, description, price, imageUrl, categoryId, creatorId });
        
        return reply.status(201).send(userCreated);
    }
}