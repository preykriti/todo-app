"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = () => {
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
    const JWT_TOKEN = process.env.JWT_TOKEN || "helloHowAreYouPeople!";
    // port: process.env.PORT ? Number(process.env.PORT) : 8000,
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    return {
        MONGO_URI,
        PORT,
        JWT_TOKEN,
    };
};
const ENV = getEnv();
exports.default = ENV;
