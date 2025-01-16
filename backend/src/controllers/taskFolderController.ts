import { Request, Response } from "express";
import { ITaskFolder, taskFolderModel } from "../models/taskFolderModel";
import { CustomJwtPayload } from "../types/types";
import { validationResult } from "express-validator";
import { taskModel } from "../models/taskModel";
import mongoose from "mongoose";

// ! to get all folders
export const getAllFolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(400).json({ success: false, message: "Unauthorized user." });
      return;
    }
    const folders = await taskFolderModel.find({ user: userID }).populate('tasks');
    res.status(200).json({ success: true, folders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ! to create a folder
export const createFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ success: false, message: result.array()[0].msg });
    return;
  }
  try {
    const { name } = req.body;
    let user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(404).json({ success: false, message: "Unauthorized user." });
      return;
    }
    const folder: ITaskFolder | null = await taskFolderModel.findOne({
      user: userID,
      name,
    });
    if (folder) {
      res
        .status(400)
        .json({ success: false, message: "Folder name already exists." });
      return;
    }
    const createdFolder = await taskFolderModel.create({ name, user: userID });
    res.status(200).json({ success: true, createdFolder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ! delete a folder
export const deleteFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(401).json({ success: false, message: "Unauthorized user." });
      return;
    }
    const folderID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(folderID)) {
      res.status(400).json({ success: false, message: "Invalid folder ID." });
      return;
    }
    const folder = await taskFolderModel.findOne({
      _id: folderID,
      user: userID,
    });
    if (!folder) {
      res.status(400).json({ success: false, message: "Folder not found" });
      return;
    }

    // creating session to maintain atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await taskModel.deleteMany({ _id: { $in: folder.tasks } });

      await taskFolderModel.deleteOne({ user: userID, _id: folderID });
      await session.commitTransaction();
      res
        .status(200)
        .json({ success: true, message: "Folder deleted successfully." });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete folder and tasks.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ! get one folder by id
export const getOneFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(401).json({ success: false, message: "Unauthorized user." });
      return;
    }

    const folderID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(folderID)) {
      res.status(400).json({ success: false, message: "Invalid folder ID." });
      return;
    }
    const folder = await taskFolderModel
      .findOne({
        _id: folderID,
        user: userID,
      })
      .populate("tasks", "title");
    if (!folder) {
      res.status(400).json({ success: false, message: "Folder not found" });
      return;
    }
    res.status(200).json({ success: true, folderdata: folder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ! update a folder's name
export const updateFolder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(400).json({ success: false, message: "Unauthorized user." });
      return;
    }
    const folderID = req.params.id;
    const newFolder: ITaskFolder = req.body;
    const folder: ITaskFolder | null = await taskModel.findOne({
      _id: folderID,
      user: userID,
    });
    if (!folder) {
      res.status(404).json({ success: false, message: "Folder not found" });
      return;
    }

    const updatedFolder = await taskModel.findByIdAndUpdate(
      folderID,
      { $set: newFolder },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, updatedFolder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
