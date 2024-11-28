import userModel, { IUser } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config/envconfig";
import { validationResult } from "express-validator";
import { CustomJwtPayload } from "../types/types";
import { taskFolderModel } from "../models/taskFolderModel";

const createToken = (id: string): string => {
  return jwt.sign({ id }, ENV.JWT_TOKEN, { expiresIn: "1h" });
};

// ! for user registration

const userRegister = async (req: Request, res: Response): Promise<void> => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ success: false, errors: result.array() });
    return;
  }
  try {
    const {
      email,
      name,
      password,
    }: { email: string; name: string; password: string } = req.body;
    let user: IUser | null = await userModel.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: "The user already exists." });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    await taskFolderModel.create({
        name: "General", user: user._id
    })

    if (!user) {
      res
        .status(500)
        .json({ success: false, message: "User creation failed." });
      return;
    }

    const authToken = createToken(user._id.toString());
    res
      .cookie("token", authToken, { httpOnly: true, sameSite: "strict" })
      .json({ success: true, authToken });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// ! user login function

const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;
    let user: IUser | null = await userModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid user credential." });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res
        .status(400)
        .json({ success: false, message: "Invalid user credential." });
      return;
    }

    const authToken = createToken(user._id.toString());
    res
      .cookie("token", authToken, { httpOnly: true, sameSite: "strict" })
      .json({ success: true, message: "Login successful!" });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// ! get user profile
const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as CustomJwtPayload | undefined;
    const userID = user?.id;
    if (!userID) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }
    const userData = await userModel.findById(userID);
    if (!userData) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    //to send user data
    res.status(200).json({
      success: true,
      user: {
        id: userData?._id,
        name: userData?.name,
        email: userData?.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

// ! logout
const userLogout = (req: Request, res: Response): void => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to logout." });
  }
};

export { userRegister, userLogin, getUserProfile, userLogout };
