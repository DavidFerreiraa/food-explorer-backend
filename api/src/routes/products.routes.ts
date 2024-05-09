import { FastifyInstance, FastifyRequest } from "fastify";
import { authenticated } from "../middleware/authenticated";
import { authorized } from "../middleware/authorized";
import { IBody, ProductsController } from "../controllers/ProductsController";
import multer from "fastify-multer";
import { STORAGE } from "../config/upload";

export async function productsRoutes(fastify: FastifyInstance) {
    const productsController = new ProductsController();
    const upload = multer({storage: STORAGE});

    fastify.post("/products", {preHandler: [authenticated, authorized(["ADMIN"]), upload.single("productImage")]}, async (request, reply) => await productsController.create(request as FastifyRequest<{Body: IBody}>, reply));
    fastify.patch("/products/:productId", {preHandler: [authenticated, authorized(["ADMIN"]), upload.single("productImage")]}, async (request, reply) => await productsController.updateImage(request, reply));
}