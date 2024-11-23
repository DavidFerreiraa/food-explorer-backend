import { FastifyReply, FastifyRequest } from "fastify";
import { createCategoryBody } from "../../utils/ZodTemplates";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryCreateService } from "../services/CategoryCreateService";
import { CategoryIndexService } from "../services/CategoryIndexService";

export class CategoriesController {
    categoriesRepository = new CategoryRepository();

    async index(request: FastifyRequest, reply: FastifyReply) {
        const categoryIndexService = new CategoryIndexService(this.categoriesRepository);

        const categories = await categoryIndexService.execute()
        
        return reply.status(200).send(categories);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name } = createCategoryBody.parse(request.body);

        const categoryCreateService = new CategoryCreateService(this.categoriesRepository);
        const categoryCreated = await categoryCreateService.execute({ name });

        return reply.status(201).send(categoryCreated);
    }
}