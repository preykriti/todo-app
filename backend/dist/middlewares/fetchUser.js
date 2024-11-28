"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const envconfig_1 = __importDefault(require("../config/envconfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fetchUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ success: false, message: "No token found" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envconfig_1.default.JWT_TOKEN);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Invalid or expired token" });
    }
};
exports.fetchUser = fetchUser;
