import { AppError } from "../../utils/AppError";
import { createUserBody } from "../../utils/ZodTemplates";
import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory"
import { UserCreateService } from "./UserCreateService";

describe("USER CREATE SERVICE", () => {
    let userRepository: UserRepositoryInMemory;
    let userCreateService: UserCreateService;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepository);
    });

    it("should create a new user", async () => {
        const user: typeof createUserBody._type = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).toHaveProperty("id");
    })

    it("should not create a new user with the same e-mail", async () => {
        const user1: typeof createUserBody._type = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        };

        await userCreateService.execute(user1);

        const user2: typeof createUserBody._type = {
            name: "User test 2",
            email: "user@test.com",
            password: "123456"
        };

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError({message: "This e-mail is already in use\nTry again with another e-mail", statusCode: 409}));
    })

    it("should not create a new user without e-mail", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).not.toHaveProperty;
    })

    it("should not create a new user with a wrong e-mail", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "something that's not an email",
            password: "123456"
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).not.toHaveProperty;
    })

    it("should not create a new user without a password", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "user@test.com",
            password: ""
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).not.toHaveProperty;
    })

    it("should not create a new user with a password lower than 6 characters", async () => {
        const user: typeof createUserBody._type = {
            name: "User test 2",
            email: "user@test.com",
            password: "12345"
        };

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).not.toHaveProperty;
    })

    it("should not create a new user without a name", async () => {
        const user: typeof createUserBody._type = {
            name: "",
            email: "user@test.com",
            password: "12345"
        };
        
        const userCreated = await userCreateService.execute(user);

        expect(userCreated).not.toHaveProperty;
    })
});