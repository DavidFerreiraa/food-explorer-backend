import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "../interfaces/IProduct";
import { updateImage } from "../../utils/updateImage";
import { AppError } from "../../utils/AppError";

export class ProductUpdateService {
    productRepository;

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository;
    }

    async execute({id, title, description, price, ingredients, imageFile, creatorId}: Partial<IProduct>, categoryId: string | undefined): Promise<Product | null>{

        if (!id) {
            throw new AppError({ message: "Product id is missing", statusCode: 404 });
        }

        const oldProduct = await this.productRepository.findById(id)

        if (!oldProduct) {
            throw new AppError({ message: "Can't find a product with this id", statusCode: 404 });
        }

        const imageUrl = imageFile? await updateImage({imageUrl: oldProduct.imageUrl, newImageFile: imageFile}) : undefined;

        const productPrice = price? new Decimal(price) : oldProduct.price;
        
        const updatedProduct = await this.productRepository.update({title, description, price: productPrice, ingredients, creatorId}, categoryId, imageUrl, oldProduct);
    
        return updatedProduct;
    }
}