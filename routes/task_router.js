import { Router } from "express";
import { addTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task_controller.js";
import { checkAuth } from "../middlewares/auth.js";

export const taskRouter = Router();

taskRouter.post('/users/tasks', addTask)

taskRouter.get('/users/tasks/:id', getTask);

taskRouter.get('/users/tasks', getTasks)

taskRouter.patch('/users/tasks/:id', updateTask)

taskRouter.delete('/users/tasks/:id', deleteTask)