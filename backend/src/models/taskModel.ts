import mongoose, { Model, Schema } from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  progress?: number;
  attachments?: string;
  folder: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },
    progress: { type: Number },
    attachments: { type: String },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "taskFolder" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const taskModel: Model<ITask> = mongoose.model<ITask>(
  "task",
  taskSchema
);
