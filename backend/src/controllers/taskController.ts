import { ITaskFolder, taskFolderModel } from "../models/taskFolderModel";
import { CustomJwtPayload } from "../types/types";
import { taskModel } from "./../models/taskModel";
import { Request, Response } from "express";

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
        res
          .status(400)
          .json({
            success: false,
            message: "Folder with this name already exists",
          });
      }
      folder = await taskFolderModel.create({ name: newFolderName, user: userID });
    } else if (folderID) {
      folder = await taskFolderModel.findById(folderID);
      if (!folder) {
        res.status(404).json({ success: false, message: "Folder not found" });
        return;
      }
    }
    const newTask = await taskModel.create({
      title,
      description,
      completed,
      deadline,
      progress,
      folder: folder!._id,
      user: userID,
    });
    res.status(201).json({ success: true, newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export { addTask };
