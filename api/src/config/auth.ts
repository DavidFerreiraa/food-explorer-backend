export const auth = {
    jwt: {
        secret: process.env.JWT_KEY_TOKEN || "default",
        expiresIn: process.env.TOKEN_EXPIRATION || "1h"
    },
    refreshToken: {
        refreshSecret: process.env.REFRESH_JWT_KEY_TOKEN || "default",
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d"
    }
}