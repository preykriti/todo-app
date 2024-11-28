"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.getUserProfile = exports.userLogin = exports.userRegister = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envconfig_1 = __importDefault(require("../config/envconfig"));
const express_validator_1 = require("express-validator");
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, envconfig_1.default.JWT_TOKEN, { expiresIn: "1h" });
};
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ success: false, errors: result.array() });
        return;
    }
    try {
        const { email, name, password, } = req.body;
        let user = yield userModel_1.default.findOne({ email });
        if (user) {
            res
                .status(400)
                .json({ success: false, message: "The user already exists." });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        user = yield userModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
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
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});
exports.userRegister = userRegister;
// ! user login function
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, } = req.body;
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res
                .status(400)
                .json({ success: false, message: "Invalid user credential." });
            return;
        }
        const comparePassword = yield bcrypt_1.default.compare(password, user.password);
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
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});
exports.userLogin = userLogin;
// ! get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userID = user === null || user === void 0 ? void 0 : user.id;
        if (!userID) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        const userData = yield userModel_1.default.findById(userID);
        if (!userData) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        //to send user data
        res.status(200).json({
            success: true,
            user: {
                id: userData === null || userData === void 0 ? void 0 : userData._id,
                name: userData === null || userData === void 0 ? void 0 : userData.name,
                email: userData === null || userData === void 0 ? void 0 : userData.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
});
exports.getUserProfile = getUserProfile;
// ! logout
const userLogout = (req, res) => {
    try {
        res.clearCookie("token");
        res
            .status(200)
            .json({ success: true, message: "Logged out successfully!" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to logout." });
    }
};
exports.userLogout = userLogout;
