"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = () => {
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    if (!PORT) {
        throw new Error("PORT is not defined in the environment variables");
    }
    return {
        MONGO_URI,
        PORT,
    };
};
const ENV = getEnv();
exports.default = ENV;
