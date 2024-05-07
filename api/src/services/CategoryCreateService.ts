import { Category } from "@prisma/client";
import { createCategoryBody } from "../../utils/ZodTemplates";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { AppError } from "../../utils/AppError";

export class CategoryCreateService {
    categoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute({ name }: typeof createCategoryBody._type): Promise<Category | null>{

        const categoryExists = await this.categoryRepository.findByName(name);

        if (categoryExists) {
            throw new AppError({message: "An error ocurred in the category creation", statusCode: 400})
        }

        const createdCategory = await this.categoryRepository.create({ name })

        return createdCategory;
    }
}