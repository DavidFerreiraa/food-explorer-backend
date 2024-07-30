import { FastifyReply, FastifyRequest } from "fastify";
import { createCategoryBody, createFavoriteId, createProductId } from "../../utils/ZodTemplates";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { CategoryCreateService } from "../services/CategoryCreateService";
import { FavoriteIndexService } from "../services/FavoriteIndexService";
import { FavoriteCreateService } from "../services/FavoriteCreateService";
import { FavoriteShowService } from "../services/FavoriteShowService";
import { FavoriteDeleteService } from "../services/FavoritesDeleteService";

export class FavoritesController {
    favoriteRepository = new FavoriteRepository();

    async index(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.user;

        const favoriteIndexService = new FavoriteIndexService(this.favoriteRepository);

        const favorites = await favoriteIndexService.execute(id)

        return reply.status(200).send(favorites);
    }

    async show(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);
        const { id } = request.user;

        const favoriteShowService = new FavoriteShowService(this.favoriteRepository);

        const favorite = await favoriteShowService.execute(id, productId);

        return reply.status(200).send(favorite);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);
        const { id } = request.user;

        const favoriteCreateService = new FavoriteCreateService(this.favoriteRepository);
        const favoriteCreated = await favoriteCreateService.execute(id, productId);

        return reply.status(201).send(favoriteCreated);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { favoriteId } = createFavoriteId.parse(request.params);
        const { id } = request.user;

        const favoriteDeleteService = new FavoriteDeleteService(this.favoriteRepository);
        favoriteDeleteService.execute(favoriteId, id).catch((error) => console.log(error));

        return reply.status(200).send({
            type: "success",
            message: "favorite successfully deleted"
        })
    }
}