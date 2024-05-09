import { FastifyReply, FastifyRequest } from "fastify";
import { createProductBody, createProductId } from "../../utils/ZodTemplates";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductCreateService } from "../services/ProductsCreateService";
import { ProductsImageService } from "../services/ProductsImageService";
import { AppError } from "../../utils/AppError";

export interface IBody {
    json: string
}

declare module 'fastify' {
    interface FastifyRequest {
        file?: {
            fieldname: string,
            originalname: string,
            encoding: string,
            mimetype: string,
            destination: string,
            filename: string,
            path: string,
            size: number
          }
    }
}
export class ProductsController {
    productsRepository = new ProductsRepository();

    async create(request: FastifyRequest<{Body: IBody}>, reply: FastifyReply) {
        const { title, description, price, categoryId } = createProductBody.parse(JSON.parse(request.body.json));

        if (!request.file) {
            throw new AppError({ message: "There's no images to upload", statusCode: 400 })
        }
        
        const imageFile = request.file.filename
        
        const { id } = request.user;

        const productsCreateService = new ProductCreateService(this.productsRepository);

        const userCreated = await productsCreateService.execute({ title, description, price, imageFile, creatorId: id }, categoryId);
        
        return reply.status(201).send(userCreated);
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