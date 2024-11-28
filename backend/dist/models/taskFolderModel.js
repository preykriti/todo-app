"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskFolderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskFolderSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true }
});
exports.taskFolderModel = mongoose_1.default.model("taskFolder", taskFolderSchema);
