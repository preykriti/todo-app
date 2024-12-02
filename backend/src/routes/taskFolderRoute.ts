import { fetchUser } from './../middlewares/fetchUser';
import express from "express";
import { createFolder, deleteFolder, getAllFolders, getOneFolder } from "../controllers/taskFolderController";
import { folderValidationRule } from '../middlewares/validationRules';

const taskFolderRouter = express.Router();

taskFolderRouter.get("/getallfolders",fetchUser, getAllFolders);
taskFolderRouter.post("/createfolder", folderValidationRule,fetchUser, createFolder);
taskFolderRouter.delete("/deletefolder/:id", fetchUser, deleteFolder);
taskFolderRouter.get("/getonefolder/:id", fetchUser, getOneFolder);

export default taskFolderRouter;