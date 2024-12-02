import { fetchUser } from './../middlewares/fetchUser';
import express from "express";
import { createFolder, getAllFolders } from "../controllers/taskFolderController";
import { folderValidationRule } from '../middlewares/validationRules';

const taskFolderRouter = express.Router();

taskFolderRouter.get("/getallfolders",fetchUser, getAllFolders);
taskFolderRouter.post("/createfolder", folderValidationRule,fetchUser, createFolder);

export default taskFolderRouter;