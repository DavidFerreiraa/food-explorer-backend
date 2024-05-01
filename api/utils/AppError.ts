interface IAppError {
    message: string,
    statusCode: number
}

export class AppError {
    message: string;
    statusCode: number;

    constructor({ message, statusCode } : IAppError) {
        this.message = message;
        this.statusCode = statusCode;
    }
}