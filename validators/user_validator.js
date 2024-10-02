import {z} from 'zod';

export const userValidator = z.object(
    {
        fullname: z.string({required_error: "fullname is required"}),
        username: z.string({required_error: "username is required"}),
        email: z.string({required_error: "email is required"}).email({message: "email must be an email"}),
        password: z.string({required_error: "password is required"}).min(5, {message: "password must be at least 5 characters long"})
    }
)

export const loginValidator = z.object(
    {
        email: z.string({required_error: "email is required"}).email({message: "email must be an email"}).optional(),
        username: z.string({required_error: "username is required"}).optional(),
        password: z.string({required_error: "password is required"})
    }
).refine((data) => {
    if(!data.email && !data.username) {
        return false
    }
    return true
}, {message: "Please provide at least one of email or username", path: ["email"]})

export const taskValidator = z.object(
    {
        title: z.string({required_error: "title is required"}),
        description: z.string({required_error: "description is required"}),
        status: z.string({required_error: "status is required"}),
        priority: z.string({required_error: "priority is required"}),
        due_date: z.string({required_error: "due date is required"})
    }
)