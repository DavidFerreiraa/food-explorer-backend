import { FastifyInstance } from "fastify";
import { authenticated } from "../middleware/authenticated";
import { FavoritesController } from "../controllers/FavoritesController";
import { deleteFavorite, getFavoritesIndex, getFavoritesShow, postFavoritesCreate } from "../swagger/favorites";

export async function favoritesRoutes(fastify: FastifyInstance) {
    const favoritesController = new FavoritesController();

    fastify.post("/favorites/:productId", {...postFavoritesCreate, preHandler: [authenticated]}, async (request, reply) => await favoritesController.create(request, reply));
    fastify.get("/favorites", {...getFavoritesIndex, preHandler: [authenticated]}, async (request, reply) => await favoritesController.index(request, reply));
    fastify.get("/favorites/:favoriteId", {...getFavoritesShow, preHandler: [authenticated]}, async (request, reply) => await favoritesController.show(request, reply));
    fastify.delete("/favorites/:favoriteId", {...deleteFavorite, preHandler: [authenticated]}, async (request, reply) => await favoritesController.delete(request, reply));
}