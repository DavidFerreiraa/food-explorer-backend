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
    price: z.string().default("00"),
    imageUrl: z.string({required_error: "You forgot to insert a image"}).url({message: "Check if it's really an url"}),
    creatorId: z.string({required_error: "You forgot to insert a creator Id"}),
    categoryId: z.string({required_error: "You forgot to insert a category Id"})
})
