"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getOneTask = exports.addTask = void 0;
const taskFolderModel_1 = require("../models/taskFolderModel");
const taskModel_1 = require("./../models/taskModel");
//! create a new task
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed, deadline, progress, folderID, newFolderName, } = req.body;
        let user = req.user;
        const userID = user === null || user === void 0 ? void 0 : user.id;
        if (!userID) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        let folder = null;
        if (newFolderName) {
            const existingFolder = yield taskFolderModel_1.taskFolderModel.findOne({
                name: newFolderName,
                user: userID,
            });
            if (existingFolder) {
                res.status(400).json({
                    success: false,
                    message: "Folder with this name already exists",
                });
                return;
            }
            folder = yield taskFolderModel_1.taskFolderModel.create({
                name: newFolderName,
                user: userID,
            });
            res.status(200).json({ success: true, message: "new folder created" });
        }
        else if (folderID) {
            folder = yield taskFolderModel_1.taskFolderModel.findById(folderID);
            if (!folder) {
                res.status(404).json({ success: false, message: "Folder not found" });
                return;
            }
        }
        else if (!folderID && !newFolderName) {
            res
                .status(400)
                .json({ success: false, message: "Please select a folder" });
            return;
        }
        const newTask = yield taskModel_1.taskModel.create({
            title,
            description,
            completed,
            deadline,
            progress,
            folderID: folder === null || folder === void 0 ? void 0 : folder._id,
            user: userID,
        });
        yield taskFolderModel_1.taskFolderModel.findByIdAndUpdate(folder === null || folder === void 0 ? void 0 : folder._id, {
            $push: { tasks: newTask._id },
        });
        res.status(201).json({ success: true, newTask });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.addTask = addTask;
//! view a single task
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const userID = user === null || user === void 0 ? void 0 : user.id;
        if (!userID) {
            res.status(400).json({ success: false, message: "Unauthorized user" });
            return;
        }
        const taskID = req.params.id;
        const task = yield taskModel_1.taskModel
            .findOne({ _id: taskID, user: userID })
            .populate("folderID", "name");
        if (!task) {
            res.status(404).json({ success: false, message: "Task not found." });
            return;
        }
        res.status(200).json({ success: true, task });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getOneTask = getOneTask;
//! delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskID = req.params.id;
    try {
        let user = req.user;
        const userID = user === null || user === void 0 ? void 0 : user.id;
        if (!userID) {
            res.status(400).json({ success: false, message: "User unauthorized." });
            return;
        }
        const task = yield taskModel_1.taskModel.findOne({ _id: taskID, user: userID });
        if (!task) {
            res.status(404).json({ success: false, message: "Task not found" });
            return;
        }
        yield taskModel_1.taskModel.deleteOne({ _id: taskID, user: userID });
        yield taskFolderModel_1.taskFolderModel.updateOne({ _id: task.folderID, user: userID }, { $pull: { tasks: taskID } });
        res.status(200).json({ success: true, message: "Task has been deleted." });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.deleteTask = deleteTask;
// ! update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userID = user === null || user === void 0 ? void 0 : user.id;
        if (!userID) {
            res.status(400).json({ success: false, message: "Unauthorized user." });
            return;
        }
        const taskID = req.params.id;
        const newTask = req.body;
        const task = yield taskModel_1.taskModel.findOne({ _id: taskID, user: userID });
        if (!task) {
            res.status(404).json({ success: false, message: "Task not found" });
            return;
        }
        const updatedTask = yield taskModel_1.taskModel.findByIdAndUpdate(taskID, { $set: newTask }, { new: true, runValidators: true });
        res.status(200).json({ success: true, updatedTask });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.updateTask = updateTask;
