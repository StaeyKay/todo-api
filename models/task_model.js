import { model, Types, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const taskSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        status: {type: String, enum: ['pending', 'completed', 'in-progress'], default: 'pending', required: true},
        priority: {type: String, enum: ['low', 'medium', 'high'], required: true},
        due_date: {type: String},
        // user: {type: Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

taskSchema.plugin(toJSON)

export const TaskModel = model('Task', taskSchema)