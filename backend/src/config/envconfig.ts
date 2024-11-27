import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
    MONGO_URI: string;
    PORT: string;
}

const getEnv = (): IEnvConfig=>{
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
}

const ENV = getEnv();
export default ENV;

