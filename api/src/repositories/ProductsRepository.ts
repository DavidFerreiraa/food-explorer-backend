import { Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createProductImageParams } from "../../utils/ZodTemplates";
import { IProduct } from "../interfaces/IProduct";

export class ProductsRepository {
    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        return product;
    }

    async create({title, description, price, creatorId}: IProduct, categoryId: string, imageUrl: string): Promise<Product | null> {
        const createdProduct = await prisma.product.create({data: {
            title,
            description,
            price,
            creatorId,
            imageUrl,
            Categories: {
                create: {
                    categoryId
                }
            }
        }})

        return createdProduct;
    }

    async updateProductImage({ productId, productImageUrl }: typeof createProductImageParams._type): Promise<Product | null>{
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                imageUrl: productImageUrl
            }
        })

        return updatedProduct;
    }
}