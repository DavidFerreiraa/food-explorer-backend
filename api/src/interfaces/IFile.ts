import { $Enums } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"

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
            },
        user: {
            id: string,
            role: $Enums.Role
            },
    }

    interface MyJwtPayload extends JwtPayload {
        role: $Enums.Role
    }
}