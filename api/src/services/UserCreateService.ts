import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory";
import { createUserBody } from "../../utils/ZodTemplates";
import { AppError } from "../../utils/AppError";
import { hash } from "bcrypt";
import { IUser } from "../interfaces/UserInterface";

export class UserCreateService {
    userRepository: UserRepositoryInMemory;

    constructor (userRepository: UserRepositoryInMemory) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }: typeof createUserBody._type) : Promise<IUser> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError({message: "This e-mail is already in use\nTry again with another e-mail", statusCode: 409});
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }
}