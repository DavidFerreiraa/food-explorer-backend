import { createProductBody, createProductId, createProductQuery } from "../../utils/ZodTemplates";
import { ProductsDeleteService } from "../services/ProductsDeleteService";
import { ProductCreateService } from "../services/ProductsCreateService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsIndexService } from "../services/ProductsIndexService";
import { ProductsImageService } from "../services/ProductsImageService";
import { ProductsShowService } from "../services/ProductsShowService";
import { FastifyReply, FastifyRequest } from "fastify";
import { IBody } from "../interfaces/IBody";
import { ProductUpdateService } from "../services/ProductsUpdateService";

export class ProductsController {
    productsRepository = new ProductsRepository();

    async index(request: FastifyRequest, reply: FastifyReply) {
        const {ingredients, productName, limit} = createProductQuery.parse(request.query);

        const productsIndexService = new ProductsIndexService(this.productsRepository);
        const product = await productsIndexService.execute(ingredients, productName, limit || 5);
        
        return reply.status(200).send(product);
    }

    async show(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);

        const productsShowService = new ProductsShowService(this.productsRepository);
        const product = await productsShowService.execute(productId);
        
        return reply.status(200).send(product);
    }

    async create(request: FastifyRequest<{Body: IBody}>, reply: FastifyReply) {
        const productJsonBody = JSON.parse(request.body.json)
        const { title, description, price, ingredients, categoryId } = createProductBody.parse(productJsonBody);

        const imageFile = request.file?.filename || ""
        const { id } = request.user;

        const productsCreateService = new ProductCreateService(this.productsRepository);
        const productCreated = await productsCreateService.execute({ title, description, price, imageFile, ingredients, creatorId: id }, categoryId);
        
        return reply.status(201).send(productCreated);
    }

    async update(request: FastifyRequest<{Body: IBody}>, reply: FastifyReply) {
        const productJsonBody = JSON.parse(request.body.json)

        const { productId } = createProductId.parse(request.params);
        const { title, description, price, ingredients, categoryId } = createProductBody.partial().parse(productJsonBody);
        
        const imageFile = request.file?.filename || ""
        const { id } = request.user;

        const productsUpdateService = new ProductUpdateService(this.productsRepository);
        const productUpdated = await productsUpdateService.execute({ id: productId, title, description, price, imageFile, ingredients, creatorId: id }, categoryId);
        
        return reply.status(201).send(productUpdated);
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