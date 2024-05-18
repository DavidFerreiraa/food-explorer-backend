import { z } from "zod"

export const createUserBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"}).min(1, {message: "You forgot to insert a name"}),
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}).min(1, {message: "You forgot to insert a name"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Password must be 6 or more characters long."}).min(1, {message: "You forgot to insert a password"})
})

export const createSessionBody = z.object({
    email: z.string({required_error: "You forgot to insert a e-mail"}).email({message: "Check if it's really an e-mail"}).min(1, {message: "You forgot to insert a e-mail"}),
    password: z.string({required_error: "You forgot to insert a password"}).min(6, { message: "Password must be 6 or more characters long."}).min(1, {message: "You forgot to insert a password"})
})

export const createProductBody = z.object({
    title: z.string({required_error: "You forgot to insert a title"}).min(1, {message: "You forgot to insert a title"}),
    description: z.string({required_error: "You forgot to insert a description"}).min(1, {message: "You forgot to insert a description"}),
    price: z.string({required_error: "You forgot to insert a price"}).min(1, {message: "You forgot to insert a price"}),
    categoryId: z.string({required_error: "You forgot to insert a category id"}).min(1, {message: "You forgot to insert a category id"}),
    ingredients: z.array<z.ZodString>(z.string(), {required_error: "Insert at least one ingredient"}).min(1, {message: "Insert at least one ingredient"})
})

export const createProductQuery = z.object({
    productName: z.string(),
    ingredients: z.string(),
    limit: z.coerce.number()
})

export const createCategoryBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"}).min(1, {message: "You forgot to insert a name"})
})

export const createProductImageParams = z.object({
    productId: z.string({required_error: "You forgot to insert the product id"}).min(1, {message: "You forgot to insert the product id"}),
    productImageUrl: z.string({required_error: "You forgot to insert the image url"}).min(1, {message: "You forgot to insert the image url"})
})

export const createProductId = z.object({
    productId: z.string({required_error: "You forgot to insert the product id"}).min(1, {message: "You forgot to insert the product id"}),
})

export const createProductImageUrl = z.object({
    productImageUrl: z.string({required_error: "You forgot to insert the image url"}).min(1, {message: "You forgot to insert the image url"})
})

export const createOrderBody = z.object({
    totalPrice: z.number({required_error: "You forgot to insert the total price"}).min(1, {message: "You forgot to insert the total price"}),
    quantity: z.number({required_error: "You forgot to insert the quantity"}).min(1, {message: "You forgot to insert the quantity"})
});

export const createOrderId = z.object({
    orderId: z.string({required_error: "You forgot to insert the order id"}).min(1, {message: "You forgot to insert the order id"}),
})
