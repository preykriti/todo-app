"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskFolderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskFolderSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "user" },
    tasks: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "task" }],
    createdAt: { type: Date, default: Date.now }
});
exports.taskFolderModel = mongoose_1.default.model("taskFolder", taskFolderSchema);
