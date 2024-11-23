import { FastifyInstance, FastifyRequest } from "fastify";
import { authenticated } from "../middleware/authenticated";
import { authorized } from "../middleware/authorized";
import { ProductsController } from "../controllers/ProductsController";
import multer from "fastify-multer";
import { STORAGE } from "../config/upload";
import { IBody } from "../interfaces/IBody";
import { deleteProduct, getProductById, getProducts, postProductsCreate, putProductUpdate, uploadProductImage } from "../swagger/products";

export async function productsRoutes(fastify: FastifyInstance) {
    const productsController = new ProductsController();
    const upload = multer({storage: STORAGE});

    fastify.post("/products", { preHandler: [authenticated, authorized(["ADMIN"]), upload.single("productImage")]}, async (request, reply) => await productsController.create(request as FastifyRequest<{Body: IBody}>, reply));
    fastify.get("/products", {...getProducts, preHandler: [authenticated]}, async (request, reply) => await productsController.index(request as FastifyRequest<{Body: IBody}>, reply));
    fastify.patch("/products/:productId", { preHandler: [authenticated, authorized(["ADMIN"]), upload.single("productImage")]}, async (request, reply) => await productsController.updateImage(request, reply));
    fastify.put("/products/:productId", { preHandler: [authenticated, authorized(["ADMIN"]), upload.single("productImage")]}, async (request, reply) => await productsController.update(request as FastifyRequest<{Body: IBody}>, reply));
    fastify.get("/products/:productId", {...getProductById, preHandler: [authenticated]}, async (request, reply) => await productsController.show(request, reply));
    fastify.delete("/products/:productId", {...deleteProduct, preHandler: [authenticated, authorized(["ADMIN"])]}, async (request, reply) => await productsController.delete(request, reply));
}