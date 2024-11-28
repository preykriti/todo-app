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
exports.addTask = void 0;
const taskFolderModel_1 = require("../models/taskFolderModel");
const taskModel_1 = require("./../models/taskModel");
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
                res
                    .status(400)
                    .json({
                    success: false,
                    message: "Folder with this name already exists",
                });
            }
            folder = yield taskFolderModel_1.taskFolderModel.create({ name: newFolderName, user: userID });
        }
        else if (folderID) {
            folder = yield taskFolderModel_1.taskFolderModel.findById(folderID);
            if (!folder) {
                res.status(404).json({ success: false, message: "Folder not found" });
                return;
            }
        }
        const newTask = yield taskModel_1.taskModel.create({
            title,
            description,
            completed,
            deadline,
            progress,
            folder: folder._id,
            user: userID,
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
