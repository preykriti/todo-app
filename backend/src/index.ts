import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT : number = 8080;

//middleware
app.use(express.json());

//routes
// app.use("/api/task", taskRoute)

app.listen(PORT, ()=>{console.log("App is listening on PORT " + PORT)});