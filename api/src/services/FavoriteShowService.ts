import { Favorites } from "@prisma/client";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { AppError } from "../../utils/AppError";

export class FavoriteShowService {
    favoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository
    }

    async execute(userId: string, productId: string): Promise<Favorites | null>{
        const favorites = await this.favoriteRepository.findById(productId, userId);

        if(!favorites) {
            throw new AppError({ message: "This product isn't a favorite", statusCode: 400 });
        }

        return favorites;
    }
}