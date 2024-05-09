import { AppError } from "../../utils/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class ProductsDeleteService {
    productsRepository;

    constructor(productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository
    }

    async execute(productId: string, ownerId: string) {
        const product = await this.productsRepository.findById(productId);

        if (!product) {
            throw new AppError({message: "This order don't exists", statusCode: 404})
        }

        if(!(product.id === productId)) {
            throw new AppError({message: "Unauthorized", statusCode: 409})
        }

        this.productsRepository.delete(productId);
    }
}