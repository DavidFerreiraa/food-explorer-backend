import { Category } from "@prisma/client";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryIndexService {
    categoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute(): Promise<Category[] | null>{
        const categories = await this.categoryRepository.index();
        return categories;
    }
}