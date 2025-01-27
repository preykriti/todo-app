
import { ITaskFolder, taskFolderModel } from "../models/taskFolderModel";
import { CustomJwtPayload } from "../types/types";
import { ITask, taskModel } from "./../models/taskModel";
import { Request, Response } from "express";

//! create a new task

const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      completed,
      deadline,
      progress,
      folderID,
      newFolderName,
    } = req.body;

    let user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    let folder: ITaskFolder | null = null;

    if (newFolderName) {
      const existingFolder = await taskFolderModel.findOne({
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
      folder = await taskFolderModel.create({
        name: newFolderName,
        user: userID,
      });
      res.status(200).json({ success: true, message: "new folder created" });
    } else if (folderID) {
      folder = await taskFolderModel.findById(folderID);
      if (!folder) {
        res.status(404).json({ success: false, message: "Folder not found" });
        return;
      }
    } else if (!folderID && !newFolderName) {
      res
        .status(400)
        .json({ success: false, message: "Please select a folder" });
      return;
    }
    const newTask: ITask = await taskModel.create({
      title,
      description,
      completed,
      deadline,
      progress,
      folderID: folder?._id,
      user: userID,
    });
    await taskFolderModel.findByIdAndUpdate(folder?._id, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json({ success: true, newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

//! view a single task
const getOneTask = async (req: Request, res: Response): Promise<void> => {
  try {
    let user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(400).json({ success: false, message: "Unauthorized user" });
      return;
    }
    const taskID = req.params.id;

    const task: ITask | null = await taskModel
      .findOne({ _id: taskID, user: userID })
      .populate("folderID", "name");
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found." });
      return;
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

//! delete a task
const deleteTask = async(req: Request, res: Response):Promise<void>=>{
    const taskID = req.params.id;

    try {
        let user = req.user as CustomJwtPayload | undefined;
        const userID = user?.id;

        if(!userID){
            res.status(400).json({success:false, message:"User unauthorized."});
            return;
        }

        const task: ITask|null = await taskModel.findOne({_id:taskID, user:userID});
        if(!task){
            res.status(404).json({success:false, message:"Task not found"});
            return;
        }
        await taskModel.deleteOne({_id:taskID, user:userID});
        await taskFolderModel.updateOne({_id:task.folderID, user:userID},{$pull:{tasks:taskID}})
        res.status(200).json({success:true, message:"Task has been deleted."})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,message: "Internal server error" });
        return;
    }
}

// ! update a task
const updateTask = async(req: Request, res: Response):Promise<void>=>{
    try {
        const user = req.user as CustomJwtPayload | undefined;
        const userID = user?.id;
        if(!userID){
            res.status(400).json({success:false, message:"Unauthorized user."});
            return;
        }
        const taskID = req.params.id;
        const newTask:ITask = req.body;
        const task:ITask|null= await taskModel.findOne({_id:taskID, user:userID});
        if(!task){
            res.status(404).json({ success: false, message: "Task not found" });
            return;
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
          taskID,
          { $set: newTask },
          { new: true, runValidators: true }
        );
        res.status(200).json({success:true, updatedTask})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,message: "Internal server error" });
        return;
    }
}

export { addTask, getOneTask, deleteTask , updateTask};
