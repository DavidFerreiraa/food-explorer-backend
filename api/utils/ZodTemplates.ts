import { z } from "zod"

export const createUserBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"}),
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Password must be 6 or more characters long."})
})

export const createSessionBody = z.object({
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Password must be 6 or more characters long."})
})

export const createProductBody = z.object({
    title: z.string({required_error: "You forgot to insert a title"}),
    description: z.string({required_error: "You forgot to insert a description"}),
    price: z.string().default("0"),
    categoryId: z.string({required_error: "You forgot to insert a category id"}),
    ingredients: z.array<z.ZodString>(z.string(), {required_error: "Insert at least one ingredient"})
})

export const createCategoryBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"})
})

export const createProductImageParams = z.object({
    productId: z.string({required_error: "You forgot to insert the product id"}),
    productImageUrl: z.string({required_error: "You forgot to insert the image url"})
})

export const createProductId = z.object({
    productId: z.string({required_error: "You forgot to insert the product id"}),
})

export const createProductImageUrl = z.object({
    productImageUrl: z.string({required_error: "You forgot to insert the image url"})
})

export const createOrderBody = z.object({
    totalPrice: z.number({required_error: "You forgot to insert the total price"}),
    quantity: z.number({required_error: "You forgot to insert the quantity"})
});

export const createOrderId = z.object({
    orderId: z.string({required_error: "You forgot to insert the order id"}),
})
