import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  MONGO_URI: string;
  PORT: number;
  JWT_TOKEN: string;
}

const getEnv = (): IEnvConfig => {
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
export default ENV;
