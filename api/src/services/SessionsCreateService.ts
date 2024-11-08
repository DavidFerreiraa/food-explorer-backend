import { compare } from "bcrypt";
import { AppError } from "../../utils/AppError";
import { createSessionBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { auth } from "../config/auth";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

interface ISessionCreateService {
    user: Omit<User, "password">,
    jwtToken: string,
    refreshJwtToken: string
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
        const { refreshSecret, refreshExpiresIn } = auth.refreshToken

        const jwtToken = jwt.sign({role: user.Role}, secret, {
            subject: user.id,
            expiresIn
        })

        const refreshJwtToken = jwt.sign({user_id: user.id}, refreshSecret, {
            subject: user.id,
            expiresIn: refreshExpiresIn
        })

        await this.userRepository.setRefreshToken(user.id, jwtToken);

        // @ts-ignore: the user received have a password, but the user shouldn't be able to see it.
        delete user.password;

        return {
            user,
            jwtToken,
            refreshJwtToken
        }
    }
}