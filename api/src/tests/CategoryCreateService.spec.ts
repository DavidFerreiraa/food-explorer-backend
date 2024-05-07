import { AppError } from "../../utils/AppError";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryCreateService} from "../services/CategoryCreateService";

describe("CATEGORY CREATE SERVICE", () => {
    let categoryRepository: CategoryRepository;
    let categoryCreateService: CategoryCreateService;

    beforeEach(() => {
        categoryRepository = new CategoryRepository();
        categoryCreateService = new CategoryCreateService(categoryRepository);
    });

    it("should create a new category", async () => {
        const categoryName = "Test Category Name"

        const categoryCreated = await categoryCreateService.execute({name: categoryName});
        
        expect(categoryCreated).toBeDefined();
    })

    it("should not create a new category with duplicated name", async () => {
        const categoryName = "Test Category Name"

        await expect(categoryCreateService.execute({name: categoryName})).rejects.toEqual(new AppError({message: "This category already exists", statusCode: 409}));
    })
})