import { FastifyReply, FastifyRequest, MyJwtPayload } from "fastify";
import { AppError } from "../../utils/AppError";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth";
import { extractTokens } from "../../utils/extractTokens";
import { refreshAccessToken } from "../services/RefreshAccessTokenService";

export async function authenticated(request: FastifyRequest, reply: FastifyReply) {
    const headers = request.headers;

    if (!headers.cookie) {
        throw new AppError({ message: "JWT is missing", statusCode: 401 });
    }

    const { token, refreshToken } = extractTokens(headers.cookie);

    try {
        // JWT verification
        const { sub: user_id, role } = jwt.verify(token, auth.jwt.secret) as MyJwtPayload;

        if (!user_id) {
            throw new AppError({ message: "Can't verify token", statusCode: 401 });
        }

        request.user = { id: user_id, role };
        return;
    } catch (error) {
        // Verify if access token is expired
        if (error instanceof jwt.TokenExpiredError) {
            // if expired, refresh the access token
            if (!refreshToken) {
                throw new AppError({ message: "Refresh token missing", statusCode: 401 });
            }

            // Call the function that access
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);

                // Returns a new access token as a cookie
                reply.setCookie("token", newAccessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 15 * 60 * 1000 // 15 minutos
                });

                return;
            } catch (refreshError) {
                throw new AppError({ message: "Invalid or expired refresh token", statusCode: 401 });
            }
        }

        // Throw auth error
        throw new AppError({ message: "Invalid JWT token", statusCode: 401 });
    }
}
