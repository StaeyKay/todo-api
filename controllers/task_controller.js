import { TaskModel } from "../models/task_model.js"
import { UserModel } from "../models/user_model.js"
import { taskValidator } from "../validators/user_validator.js"


// Endpoint for users to add new tasks
export const addTask = async (req, res) => {
    try {
        // Validate user request
        const validationResult = taskValidator.safeParse(req.body)
    
        if(!validationResult.success) {
            const errors = validationResult.error.issues.map(({ message }) => message).join('. ');
            return res.status(400).json({error: errors})
        }
    
        const task = validationResult.data
    
        // Check if user exists
        const userId = req.user?.id
    
        const user = await UserModel.findById(userId)
        if(!user) {
            return res.status(400).json('User not found')
        }
    
        const newTask = await TaskModel.create({
            ...task,
            user: userId
        })

        return res.status(200).json({message: 'New task has been added successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// Endpoint for users to update tasks
export const updateTask = async (req, res) => {
    try {
        // Check if user exists
        const userId = req.user?.id;
    
        const user = await UserModel.findById(userId)
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
    
        const task = await TaskModel.findByIdAndUpdate(req.params.id, value, {new: true})
        if(!task) {
            return res.status(404).json('Task not found')
        }
        // Return response
        res.status(200).json({
            message: 'The task has been updated successfully',
            task: task
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: error.message})
    }
}

// Endpoint to get a task by id
export const getTask = async (req, res) => {
    try {
        // Check if user exists
        const userId = req.user?.id;
        const user = await UserModel.findById(userId)
        if(!user) {
            return res.status(400).json('User not found')
        }
    
        const task = await TaskModel.findById(req.params.id);
        if(!task) {
            return res.status(400).json({message: 'Task not found'})
        }
    
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// Endpoint to get all tasks
export const getTasks = async (req, res) => {
    try {
        // Check if user exists
        const userId = req.user?.id;
        const user = UserModel.findById(userId)
        if(!user) {
            return res.status(400).json('User not found')
        }
    
        const tasks = await TaskModel.find({user: userId})
    
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}