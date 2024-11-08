import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AppError } from "../../utils/AppError";
import { auth } from "../config/auth";
import { MyJwtPayload } from "fastify";

// Função que renova o accessToken usando o refreshToken
export async function refreshAccessToken(refreshToken: string) {
    try {
        // Verifica o refreshToken
        const { sub: user_id, role } = jwt.verify(refreshToken, auth.refreshToken.refreshSecret) as MyJwtPayload;

        // Verifica se o usuário existe no banco de dados
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) {
            throw new AppError({ message: "User not found", statusCode: 401 });
        }

        // Gera um novo accessToken
        const newAccessToken = jwt.sign(
            { role },
            auth.jwt.secret,
            { subject: user.id, expiresIn: auth.jwt.expiresIn }
        );

        return newAccessToken;
    } catch (error) {
        // Se o refreshToken for inválido ou expirado, lança um erro
        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError({ message: "Refresh token expired", statusCode: 401 });
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError({ message: "Invalid refresh token", statusCode: 401 });
        } else {
            throw new AppError({ message: "An error occurred during token renewal", statusCode: 500 });
        }
    }
}
