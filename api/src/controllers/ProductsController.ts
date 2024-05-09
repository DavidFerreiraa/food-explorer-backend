import { createProductBody, createProductId } from "../../utils/ZodTemplates";
import { ProductCreateService } from "../services/ProductsCreateService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsImageService } from "../services/ProductsImageService";
import { ProductsShowService } from "../services/ProductsShowService";
import { FastifyReply, FastifyRequest } from "fastify";
import { IBody } from "../interfaces/IBody";
import { ProductsDeleteService } from "../services/ProductsDeleteService";

export class ProductsController {
    productsRepository = new ProductsRepository();

    async show(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);

        const productsShowService = new ProductsShowService(this.productsRepository);
        const product = await productsShowService.execute(productId);
        
        return reply.status(200).send(product);
    }

    async create(request: FastifyRequest<{Body: IBody}>, reply: FastifyReply) {
        const { title, description, price, categoryId, ingredients } = createProductBody.parse(JSON.parse(request.body.json));
        
        const imageFile = request.file?.filename || ""
        
        const { id } = request.user;

        const productsCreateService = new ProductCreateService(this.productsRepository);
        const productCreated = await productsCreateService.execute({ title, description, price, imageFile, ingredients, creatorId: id }, categoryId);
        
        return reply.status(201).send(productCreated);
    }

    async updateImage(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);
        
        const imageFile = request.file?.filename || ""

        const productsRepository = new ProductsRepository();
        const productsImageService = new ProductsImageService(productsRepository);

        const productWithUpdatedImage = await productsImageService.execute(productId, imageFile);
        
        return reply.status(201).send(productWithUpdatedImage);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);
        const ownerId = request.user.id;

        const productsDeleteService = new ProductsDeleteService(this.productsRepository);
        await productsDeleteService.execute(productId, ownerId);

        return reply.status(200).send({
            type: "success",
            message: "product successfully deleted"
        })
    }
}