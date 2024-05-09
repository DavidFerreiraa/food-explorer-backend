import { createProductBody, createProductId } from "../../utils/ZodTemplates";
import { ProductCreateService } from "../services/ProductsCreateService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsImageService } from "../services/ProductsImageService";
import { ProductsShowService } from "../services/ProductsShowService";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../utils/AppError";
import { IBody } from "../interfaces/IBody";

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

        if (!request.file) {
            throw new AppError({ message: "There's no images to upload", statusCode: 400 })
        }
        
        const imageFile = request.file.filename
        
        const { id } = request.user;

        const productsCreateService = new ProductCreateService(this.productsRepository);
        const productCreated = await productsCreateService.execute({ title, description, price, imageFile, ingredients, creatorId: id }, categoryId);
        
        return reply.status(201).send(productCreated);
    }

    async updateImage(request: FastifyRequest, reply: FastifyReply) {
        const { productId } = createProductId.parse(request.params);

        if (!request.file) {
            throw new AppError({ message: "There's no images to update", statusCode: 400 })
        }
        
        const imageFile = request.file.filename

        const productsRepository = new ProductsRepository();
        const productsImageService = new ProductsImageService(productsRepository);

        const productWithUpdatedImage = await productsImageService.execute(productId, imageFile);
        
        return reply.status(201).send(productWithUpdatedImage);
    }
}