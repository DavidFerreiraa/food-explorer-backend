import { Product } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class ProductsIndexService {
    productsRepository;

    constructor (productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository;
    }

    async execute(searchTerm?: string, limit: number = 30): Promise<Product[] | null> {
        const products = await this.productsRepository.index(searchTerm, limit);
        
        if (!products) {
            throw new AppError({ message: "There's no products available", statusCode: 404 })
        }

        return products;
    }
}