import { fetchUser } from './../middlewares/fetchUser';
import express from "express";
import { getAllFolders } from "../controllers/taskFolderController";

const taskFolderRouter = express.Router();

taskFolderRouter.get("/getallfolders",fetchUser, getAllFolders);

export default taskFolderRouter;