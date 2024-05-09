import { z } from "zod"

export const createUserBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"}),
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Must be 6 or more characters long."})
})

export const createSessionBody = z.object({
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Must be 6 or more characters long."})
})

export const createProductBody = z.object({
    title: z.string({required_error: "You forgot to insert a title"}),
    description: z.string({required_error: "You forgot to insert a description"}),
    price: z.string().default("0"),
    categoryId: z.string({required_error: "You forgot to insert a category Id"}),
    ingredients: z.array<z.ZodString>(z.string(), {required_error: "Insert at least one ingredient"})
})

export const createCategoryBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"})
})

export const createProductImageParams = z.object({
    productId: z.string({required_error: "You forgot to insert the productId"}),
    productImageUrl: z.string({required_error: "You forgot to insert the image url"})
})

export const createProductId = z.object({
    productId: z.string({required_error: "You forgot to insert the productId"}),
})

export const createProductImageUrl = z.object({
    productImageUrl: z.string({required_error: "You forgot to insert the image url"})
})
