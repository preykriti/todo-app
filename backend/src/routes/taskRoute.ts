import { fetchUser } from './../middlewares/fetchUser';
import { addTask, deleteTask, getOneTask } from "../controllers/taskController";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/addtask",fetchUser,addTask);
taskRouter.get("/getonetask/:id",fetchUser,getOneTask);
taskRouter.delete("/deletetask/:id", fetchUser, deleteTask);



export default taskRouter;