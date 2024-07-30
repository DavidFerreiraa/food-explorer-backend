import { Favorites } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class FavoriteRepository {
    async index(userId: string): Promise< Favorites[] | null>{
        const favorites = await prisma.favorites.findMany({
            include: {
                Product: true
            },
            where: {
                userId
            }
        })

        return favorites;
    }

    async findById(favoriteId: string, userId: string): Promise<Favorites | null> {
        const favorite = await prisma.favorites.findUnique({
            where: {
                id: favoriteId,
                userId
            }
        })

        return favorite;
    }

    async create(userId: string, productId: string): Promise<Favorites | null> {
        const favorite = await prisma.favorites.create({data: {
            Product: {
                connect: {
                    id: productId,
                }
            },
            userId
        }})

        return favorite;
    }

    async delete(id: string, userId: string) {
        await prisma.favorites.delete({
            where: {
                id,
                userId
            }
        })
    }
}