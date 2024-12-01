import mongoose, { Model, Schema, Document, Types } from "mongoose";

export interface ITaskFolder extends Document {
    _id: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  tasks: Types.ObjectId[];
}

const taskFolderSchema: Schema<ITaskFolder> = new mongoose.Schema(
  {
    name: { type: String, required: true, unique:true},
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

export const taskFolderModel: Model<ITaskFolder> = mongoose.model(
  "taskFolder",
  taskFolderSchema
);
