import { Request, Response, NextFunction } from "express"
import ENV from "../config/envconfig";
import jwt from "jsonwebtoken";

export const fetchUser = (req:Request, res:Response, next:NextFunction):void=>{
    const token = req.cookies.token;
    if(!token){
     res.status(401).json({success:false, message:"No token found"});
     return;
    }
    try {
        const decoded = jwt.verify(token, ENV.JWT_TOKEN);
        req.user = decoded;
        next();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Invalid or expired token"})
    }
}