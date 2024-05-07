import { FastifyReply, FastifyRequest } from "fastify";
import { createCategoryBody } from "../../utils/ZodTemplates";
import { AppError } from "../../utils/AppError";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryCreateService } from "../services/CategoryCreateService";

export class CategoriesController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name } = createCategoryBody.parse(request.body);

        const categoriesRepository = new CategoryRepository();
        const categoryCreateService = new CategoryCreateService(categoriesRepository);

        const categoryCreated = await categoryCreateService.execute({ name });

        return reply.status(201).send(categoryCreated);
    }
}