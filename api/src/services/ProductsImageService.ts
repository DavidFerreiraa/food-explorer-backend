import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { AppError } from "../../utils/AppError";
import { updateImage } from "../../utils/updateImage";

export class ProductsImageService {
    productRepository;

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository;
    }

    async execute(productId: string, imageFile: string): Promise<Product | null>{
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new AppError({message: "This product don't exists", statusCode: 404})
        }
        
        const updatedImageUrl = await updateImage({ newImageFile: imageFile, imageUrl: product.imageUrl });

        const updatedProduct = await this.productRepository.updateProductImage({ productId, productImageUrl: updatedImageUrl });

        return updatedProduct;
    }
}