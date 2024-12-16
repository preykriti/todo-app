import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRoute";
import taskFolderRouter from "./routes/taskFolderRoute";
import cors from "cors";

dotenv.config();
const app = express();
connectDB();

const PORT: number = 8080;

//middleware
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/folder", taskFolderRouter);

app.listen(PORT, () => {
  console.log("App is listening on PORT " + PORT);
});
