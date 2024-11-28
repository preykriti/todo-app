"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchUser_1 = require("./../middlewares/fetchUser");
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validationRules_1 = require("../middlewares/validationRules");
const userRouter = express_1.default.Router();
userRouter.post("/register", validationRules_1.userValidationRules, userController_1.userRegister);
userRouter.post("/login", validationRules_1.userValidationForLogin, userController_1.userLogin);
userRouter.get("/getuserprofile", fetchUser_1.fetchUser, userController_1.getUserProfile);
userRouter.post("/logout", userController_1.userLogout);
exports.default = userRouter;
