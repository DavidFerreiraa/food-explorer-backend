import { AppError } from "../../utils/AppError";
import { createSessionBody } from "../../utils/ZodTemplates";
import { UserRepository } from "../repositories/UserRepository";
import { SessionsCreateService } from "../services/SessionsCreateService";

describe("SESSIONS CREATE SERVICE", () => {
    let userRepository: UserRepository;
    let sessionsCreateService: SessionsCreateService;

    beforeEach(() => {
        userRepository = new UserRepository();
        sessionsCreateService = new SessionsCreateService(userRepository);
    });

    it("should create a new session with a created user", async () => {
        const user: typeof createSessionBody._type = {
            email: "test@email.com",
            password: "123456"
        };

        const sessionCreated = await sessionsCreateService.execute(user);
        
        expect(sessionCreated).toBeDefined();
    })

    it("should not create a new session with a user with a wrong e-mail", async () => {
        const user: typeof createSessionBody._type = {
            email: "",
            password: "123456"
        };

        await expect(sessionsCreateService.execute(user)).rejects.toEqual(new AppError({message: "E-mail or password invalids", statusCode: 401}));
    })

    it("should not create a new session with a user with a wrong password", async () => {
        const user: typeof createSessionBody._type = {
            email: "test@email.com",
            password: ""
        };

        await expect(sessionsCreateService.execute(user)).rejects.toEqual(new AppError({message: "E-mail or password invalids", statusCode: 401}));
    })
})