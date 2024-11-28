import mongoose, { Model, Schema } from "mongoose";

export interface ITaskFolder {
    name: string,
    user: mongoose.Schema.Types.ObjectId;
    tasks: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
}

const taskFolderSchema: Schema<ITaskFolder> = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"user" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref:"task" }],
  createdAt: {type:Date, default:Date.now}
});

export const taskFolderModel: Model<ITaskFolder> = mongoose.model("taskFolder", taskFolderSchema);