import { Router } from "express";
import { addTask } from "../controllers/task_controller.js";
import { checkAuth } from "../middlewares/auth.js";

export const taskRouter = Router();

taskRouter.post('/users/tasks', checkAuth, addTask)