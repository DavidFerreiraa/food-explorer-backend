import { Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createProductBody } from "../../utils/ZodTemplates";

export class ProductsRepository {
    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        return product;
    }

    async create({ title, description, price, creatorId, imageUrl, categoryId }: typeof createProductBody._type): Promise<Product | null> {
        const product = await prisma.product.create({data: {
            title,
            description,
            price,
            creatorId,
            imageUrl,
            Categories: {
                connect: {
                    categoryId
                }
            }
        }})

        return product;
    }
}