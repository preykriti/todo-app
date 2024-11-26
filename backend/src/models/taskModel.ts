
import mongoose, { Model, Schema } from "mongoose";

interface ITask {
    title: string,
    description: string,
    completed: boolean
}

const taskSchema: Schema<ITask> = new mongoose.Schema<ITask>({
    title:{ type: String, required: true},
    description:{type: String},
    completed:{type:Boolean}
}, {timestamps:true});

export const taskModel: Model<ITask> = mongoose.model<ITask>("task", taskSchema);