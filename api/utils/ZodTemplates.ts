import { z } from "zod"

export const createUserBody = z.object({
    name: z.string({required_error: "You forgot to insert a name"}),
    email: z.string().email({message: "Check if it's really an e-mail"}),
    password: z.string().min(6, { message: "Must be 6 or more characters long."})
})