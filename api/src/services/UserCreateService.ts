import { UserRepository } from "../repositories/UserRepository";
import { createUserBody } from "../../utils/ZodTemplates";
import { AppError } from "../../utils/AppError";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { validate } from "email-validator";

export class UserCreateService {
    userRepository: UserRepository;

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }: typeof createUserBody._type) : Promise<User | null> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError({message: "This e-mail is already in use, try again with another e-mail", statusCode: 409});
        }

        if (!name || !email || !password) {
            throw new AppError({message: "All fields are needed", statusCode: 409});
        }

        if(password.length < 6) {
            throw new AppError({message: "Your password is too week", statusCode: 409});
        }

        if (!validate(email)) {
            throw new AppError({message: "Insert a valid e-mail", statusCode: 409});
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }
}