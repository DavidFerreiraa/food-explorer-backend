import { Favorites } from "@prisma/client";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { AppError } from "../../utils/AppError";

export class FavoriteCreateService {
    favoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository
    }

    async execute(userId: string, productId: string): Promise<Favorites | null>{

        const createdFavorite = await this.favoriteRepository.create(userId, productId);

        if(!createdFavorite) {
            throw new AppError({ message: "Can't add this product to favorites", statusCode: 500 })
        }

        return createdFavorite;
    }
}