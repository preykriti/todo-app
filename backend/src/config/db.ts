import mongoose from "mongoose";
import ENV from "./envconfig";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
  }
};

export default connectDB;
