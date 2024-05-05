import { compare } from "bcrypt";
import { AppError } from "../../utils/AppError";
import { createSessionBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { auth } from "../config/auth";
import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

interface ISessionCreateService {
    user: Omit<User, "password">,
    jwtToken: string
}

export class SessionsCreateService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async execute({ email, password }: Omit<typeof createSessionBody._type, "name">): Promise<ISessionCreateService> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError({message: "E-mail or password invalids", statusCode: 401});
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError({message: "E-mail or password invalids", statusCode: 401});
        }

        const { secret, expiresIn } = auth.jwt;

        const jwtToken = sign({role: user.Role}, secret, {
            subject: String(user.id),
            expiresIn
        })

        // @ts-ignore: the user received have a password, but the user shouldn't be able to see it.
        delete user.password;

        return {
            user,
            jwtToken
        }
    }
}