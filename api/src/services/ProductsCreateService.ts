import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { createProductBody } from "../../utils/ZodTemplates";

export class ProductCreateService {
    productRepository;

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository
    }

    async execute({title, description, price, imageUrl, categoryId, creatorId, }: typeof createProductBody._type): Promise<Product | null>{
        const createdProduct = await this.productRepository.create({title, description, price, imageUrl, categoryId, creatorId})

        return createdProduct;
    }
}