import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createUserBody } from "../../utils/ZodTemplates";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user;
    }

    async create({ name, email, password}: typeof createUserBody._type): Promise<User | null> {
        const user = await prisma.user.create({data: {
            name,
            email,
            password
        }})

        return user;
    }

    // Updates the user refresh token
    async setRefreshToken(userId: string, refreshToken: string): Promise<User | null> {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                refreshToken: refreshToken,  // Armazenando o refreshToken no campo do usuário
            },
        });

        return updatedUser;
    }

    async findByRefreshToken(refreshToken: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { refreshToken: refreshToken },
        });

        return user;
    }
}