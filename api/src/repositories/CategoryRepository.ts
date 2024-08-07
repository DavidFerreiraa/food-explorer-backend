import { Category, Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createCategoryBody } from "../../utils/ZodTemplates";

export class CategoryRepository {
    async index(): Promise< Category[] | null>{
        const categories = await prisma.category.findMany({
            include: {
                Products: {
                    select: {
                        Product: true
                    }
                }
            }
        })
        return categories;
    }

    async findById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        })

        return category;
    }

    async findByName(name: string) {
        const category = await prisma.category.findMany({
            where: {
                name
            }
        })

        return category;
    }

    async create({ name }: typeof createCategoryBody._type): Promise<Category | null> {
        const category = await prisma.category.create({data: {
            name
        }})

        return category;
    }
}