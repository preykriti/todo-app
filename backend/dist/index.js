"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const taskFolderRoute_1 = __importDefault(require("./routes/taskFolderRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
const PORT = 8080;
//middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//routes
app.use("/api/user", userRoute_1.default);
app.use("/api/task", taskRoute_1.default);
app.use("/api/folder", taskFolderRoute_1.default);
app.listen(PORT, () => {
    console.log("App is listening on PORT " + PORT);
});
