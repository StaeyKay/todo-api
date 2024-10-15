import { Router } from "express";
import { addTask, getTask, getTasks, updateTask } from "../controllers/task_controller.js";
import { checkAuth } from "../middlewares/auth.js";

export const taskRouter = Router();

taskRouter.post('/users/tasks', checkAuth, addTask)

taskRouter.get('/users/tasks/:id', checkAuth, getTask);

taskRouter.get('/users/tasks', checkAuth, getTasks)

taskRouter.patch('/users/tasks/:id', checkAuth, updateTask)