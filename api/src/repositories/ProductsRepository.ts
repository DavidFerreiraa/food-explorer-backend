import { Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createProductImageParams } from "../../utils/ZodTemplates";
import { IProduct } from "../interfaces/IProduct";

export class ProductsRepository {
    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                Ingredients: true
            }
        })

        return product;
    }

    async create({title, description, price, ingredients, creatorId}: IProduct, categoryId: string, imageUrl: string): Promise<Product | null> {
        const data = ingredients.map(ingredient => ({
            name: ingredient
        }));
        
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
            },
            Ingredients: {
                createMany: {
                    data
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