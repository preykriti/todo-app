import mongoose, { Model, Schema } from "mongoose";

export interface ITaskFolder {
    name: string,
    user: mongoose.Schema.Types.ObjectId;
    tasks: mongoose.Schema.Types.ObjectId[];
    
}

const taskFolderSchema: Schema<ITaskFolder> = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"user" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref:"task" }],

},{timestamps:true});

export const taskFolderModel: Model<ITaskFolder> = mongoose.model("taskFolder", taskFolderSchema);