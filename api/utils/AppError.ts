import { IAppError } from "../src/interfaces/IAppError";

export class AppError {
    message: string;
    statusCode: number;

    constructor({ message, statusCode } : IAppError) {
        this.message = message;
        this.statusCode = statusCode;
    }
}