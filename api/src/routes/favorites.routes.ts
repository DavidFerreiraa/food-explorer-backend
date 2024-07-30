import { FastifyInstance } from "fastify";
import { authenticated } from "../middleware/authenticated";
import { FavoritesController } from "../controllers/FavoritesController";

export async function favoritesRoutes(fastify: FastifyInstance) {
    const favoritesController = new FavoritesController();

    fastify.post("/favorites/:productId", {preHandler: [authenticated]}, async (request, reply) => await favoritesController.create(request, reply));
    fastify.get("/favorites", {preHandler: [authenticated]}, async (request, reply) => await favoritesController.index(request, reply));
    fastify.get("/favorites/:favoriteId", {preHandler: [authenticated]}, async (request, reply) => await favoritesController.show(request, reply));
    fastify.delete("/favorites/:favoriteId", {preHandler: [authenticated]}, async (request, reply) => await favoritesController.delete(request, reply));
}