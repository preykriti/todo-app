import mongoose, { Model, Schema, Document, Types } from "mongoose";

export interface ITaskFolder extends Document {
  _id: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  tasks: Types.ObjectId[];
}

const taskFolderSchema: Schema<ITaskFolder> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

taskFolderSchema.index({ user: 1, name: 1 }, { unique: true });

export const taskFolderModel: Model<ITaskFolder> = mongoose.model(
  "taskFolder",
  taskFolderSchema
);
