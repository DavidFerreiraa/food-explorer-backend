import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "../interfaces/IProduct";
import { updateImage } from "../../utils/updateImage";
import { AppError } from "../../utils/AppError";

export class ProductCreateService {
    productRepository;

    constructor(productRepository: ProductsRepository) {
        this.productRepository = productRepository;
    }

    async execute({title, description, price, ingredients, imageFile, creatorId}: IProduct, categoryId: string): Promise<Product | null>{
        if (imageFile?.length === 0 || imageFile === undefined) {
            throw new AppError({ message: "image is missing", statusCode: 400 })
        }

        const imageUrl = await updateImage({newImageFile: imageFile})

        const productPrice = new Decimal(price);
        
        const createdProduct = await this.productRepository.create({title, description, price: productPrice, ingredients, creatorId}, categoryId, imageUrl);
    
        return createdProduct;
    }
}