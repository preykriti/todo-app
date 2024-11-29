import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRoute";

dotenv.config();
const app = express();
connectDB();

const PORT: number = 8080;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log("App is listening on PORT " + PORT);
});
