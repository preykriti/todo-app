import {Request, Response} from "express";
import { ITaskFolder, taskFolderModel } from "../models/taskFolderModel";
import { CustomJwtPayload } from "../types/types";
import { validationResult } from "express-validator";

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
        const folders = await taskFolderModel.find({user: userID}).populate("name");
        res.status(200).json({success:true, folders})
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
    }

}

// ! to create a folder
export const createFolder = async(req: Request, res: Response):Promise<void>=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ success: false, errors: result.array() });
      return;
    }
    try {
        const{name} = req.body;
        let user = req.user as CustomJwtPayload | undefined;
        const userID = user?.id;
        if(!userID){
            res.status(404).json({success:false, message: "Unauthorized user."});
            return;
        }
        const folder:ITaskFolder | null = await taskFolderModel.findOne({user:userID, name});
        if(folder){
            res.status(400).json({success:false, message:"Folder name already exists."});
            return;
        }
        const createdFolder = await taskFolderModel.create({name, user:userID});
        res.status(200).json({success:true, createdFolder})
        
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
    }
}

