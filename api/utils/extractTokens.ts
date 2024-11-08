import { AppError } from "./AppError";

export function extractTokens(headerCookies: string): {token: string; refreshToken: string} {
    // Usando uma expressão regular para extrair o token e o refreshToken
    const regex = /token=([^;]+);?\s*refreshToken=([^;]+)/;

    // Aplica a expressão regular à string
    const matches = headerCookies.match(regex);

    // Verifica se a expressão regular encontrou os tokens
    if (matches && matches.length >= 3) {
        // Retorna um objeto com o token e refreshToken
        return {
            token: matches[1],         // A primeira captura é o valor do token
            refreshToken: matches[2]   // A segunda captura é o valor do refreshToken
        };
    } else {
        throw new AppError({message: "Tokens not found", statusCode: 404});
    }
}