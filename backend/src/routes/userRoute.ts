import { fetchUser } from './../middlewares/fetchUser';
import express from "express";
import { userRegister , userLogin, userLogout, getUserProfile} from "../controllers/userController";
import { userValidationForLogin, userValidationRules } from "../middlewares/validationRules";

const userRouter = express.Router();

userRouter.post("/register",userValidationRules, userRegister);
userRouter.post("/login", userValidationForLogin, userLogin);
userRouter.get("/getuserprofile",fetchUser,getUserProfile);
userRouter.post("/logout", userLogout);

export default userRouter;
