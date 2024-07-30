import { Favorites } from "@prisma/client";
import { FavoriteRepository } from "../repositories/FavoriteRepository";

export class FavoriteIndexService {
    favoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository
    }

    async execute(userId: string): Promise<Favorites[] | null>{
        const categories = await this.favoriteRepository.index(userId);
        return categories;
    }
}