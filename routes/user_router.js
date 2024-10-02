import { Router } from "express";
import { login, register } from "../controllers/user_controller.js";

export const userRouter = Router();

// Define routes
userRouter.post('/users/auth/register', register)

userRouter.post('/users/auth/login', login)