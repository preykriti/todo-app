"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },
    progress: { type: Number },
    folderID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "taskFolder" },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    newFolderName: { type: String }
}, { timestamps: true });
exports.taskModel = mongoose_1.default.model("task", taskSchema);
