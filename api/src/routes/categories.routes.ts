import { FastifyInstance } from "fastify";
import { CategoriesController } from "../controllers/CategoriesController";
import { authenticated } from "../middleware/authenticated";
import { authorized } from "../middleware/authorized";
import { getCategoriesIndex, postCategoriesCreate } from "../swagger/categories";

export async function categoriesRoutes(fastify: FastifyInstance) {
    const categoriesController = new CategoriesController();

    fastify.post("/categories", {...postCategoriesCreate, preHandler: [authenticated, authorized(["ADMIN"])]}, async (request, reply) => await categoriesController.create(request, reply));
    fastify.get("/categories", {...getCategoriesIndex, preHandler: [authenticated]}, async (request, reply) => await categoriesController.index(request, reply));
}