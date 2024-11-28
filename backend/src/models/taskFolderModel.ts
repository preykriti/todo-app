import mongoose, { Model, Schema } from "mongoose";

export interface ITaskFolder {
    name: string,
    user: mongoose.Schema.Types.ObjectId;
    tasks: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
}

const taskFolderSchema: Schema<ITaskFolder> = new mongoose.Schema({
    name:{type: String, required: true}
});

export const taskFolderModel: Model<ITaskFolder> = mongoose.model("taskFolder", taskFolderSchema);