import { Product } from "@prisma/client";
import { AppError } from "../../utils/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class ProductsShowService {
    productsRepository;

    constructor (productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository;
    }

    async execute(productId: string): Promise<Product | null> {
        const product = await this.productsRepository.findById(productId);
        
        if (!product) {
            throw new AppError({ message: "This product don't exists", statusCode: 404 })
        }

        return product;
    }
}