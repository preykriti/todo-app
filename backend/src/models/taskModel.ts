
import mongoose, { Model, Schema } from "mongoose";

export interface ITask {
    title: string,
    description: string,
    completed: boolean,
    deadline?: Date;
    progress?: number,
    attachments?: string,
}

const taskSchema: Schema<ITask> = new mongoose.Schema<ITask>({
    title:{ type: String, required: true},
    description:{type: String},
    completed:{type:Boolean},
    deadline:{type:Date},
    progress:{type: Number},
    attachments:{type:  String}
}, {timestamps:true});

export const taskModel: Model<ITask> = mongoose.model<ITask>("task", taskSchema);