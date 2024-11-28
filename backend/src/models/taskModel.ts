import mongoose, { Model, Schema, Document, Types } from "mongoose";

export interface ITask extends Document{
  _id: Types.ObjectId
  title: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  progress?: number;
  folderID: Types.ObjectId;
  user:Types.ObjectId;
  newFolderName: string;
}

const taskSchema: Schema<ITask> = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },
    progress: { type: Number },
    folderID: { type: mongoose.Schema.Types.ObjectId, ref: "taskFolder" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    newFolderName:{type:String}
  },
  { timestamps: true }
);

export const taskModel: Model<ITask> = mongoose.model<ITask>(
  "task",
  taskSchema
);
