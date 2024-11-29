import { fetchUser } from './../middlewares/fetchUser';
import { addTask, getOneTask } from "../controllers/taskController";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/addtask",fetchUser,addTask);
taskRouter.get("/getonetask/:id",fetchUser,getOneTask);



export default taskRouter;