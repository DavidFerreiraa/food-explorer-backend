import { AppError } from "../../utils/AppError";
import { createUserBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService } from "./UserCreateService";

describe("USER CREATE SERVICE", () => {
    console.log(process.env)
    let userRepository: UserRepository;
    let userCreateService: UserCreateService;

    beforeEach(() => {
        userRepository = new UserRepository();
        userCreateService = new UserCreateService(userRepository);
    });

    it("should create a new user", async () => {
        const user: typeof createUserBody._type = {
            name: "User test",
            email: "test@email.com",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).toHaveProperty("id");
    })

    it("should not create a new user with the same e-mail", async () => {
        const user2: typeof createUserBody._type = {
            name: "User test 2",
            email: "test@email.com",
            password: "123456"
        };

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError({message: "This e-mail is already in use, try again with another e-mail", statusCode: 409}));
    })

    it("should not create a new user without e-mail", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "",
            password: "123456"
        };

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError({message: "All fields are needed", statusCode: 409}));
    })

    it("should not create a new user with a wrong e-mail", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "something that's not an email",
            password: "123456"
        };

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError({message: "Insert a valid e-mail", statusCode: 409}));
    })

    it("should not create a new user without a password", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "test2@email.com",
            password: ""
        };

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError({message: "All fields are needed", statusCode: 409}));
    })

    it("should not create a new user with a password lower than 6 characters", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "test3@email.com",
            password: "12345"
        };

        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError({message: "Your password is too week", statusCode: 409}));
    })

    it("should not create a new user without a name", async () => {
        const user: typeof createUserBody._type = {
            name: "",
            email: "test4@email.com",
            password: "12345"
        };
        
        await expect(userCreateService.execute(user)).rejects.toEqual(new AppError({message: "All fields are needed", statusCode: 409}));
    })
});