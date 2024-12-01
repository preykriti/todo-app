import {Request, Response} from "express";
import { ITaskFolder, taskFolderModel } from "../models/taskFolderModel";
import { CustomJwtPayload } from "../types/types";

// ! to get all folders
export const getAllFolders = async(req: Request, res:Response): Promise<void>=>{
    try {
        let user = req.user as CustomJwtPayload | undefined;
        const userID = user?.id;
        if(!userID){
             res
               .status(400)
               .json({ success: false, message: "Unauthorized user." });
             return;
        }
        const folders = await taskFolderModel.find({user: userID});
        res.status(200).json({success:true, folders})
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
    }
}

