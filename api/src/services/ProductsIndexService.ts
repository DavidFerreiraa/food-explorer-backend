import { Product } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class ProductsIndexService {
    productsRepository;

    constructor (productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository;
    }

    async execute(ingredients?: string, productName?: string, limit: number = 5): Promise<Product[] | null> {
        const products = await this.productsRepository.index(ingredients, productName, limit);
        
        if (!products) {
            throw new AppError({ message: "There's no products available", statusCode: 404 })
        }

        return products;
    }
}