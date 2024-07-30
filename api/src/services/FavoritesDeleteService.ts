import { Favorites } from "@prisma/client";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { AppError } from "../../utils/AppError";

export class FavoriteDeleteService {
    favoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository
    }

    async execute(favoriteId: string, userId: string): Promise<void> {
        const favorite = await this.favoriteRepository.findById(favoriteId, userId);

        if (!favorite) {
            throw new AppError({message: "This favorite don't exists", statusCode: 404})
        }
        
        if(favorite.userId !== userId) {
            throw new AppError({message: "Unauthorized", statusCode: 409})
        }

        await this.favoriteRepository.delete(favoriteId, userId)
    }
}