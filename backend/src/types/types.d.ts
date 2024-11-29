import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface CustomJwtPayload{
    id: mongoose.Schema.Types.ObjectId;
}

declare global{
    namespace Express{
        interface Request{
            user?: string | JwtPayload |CustomJwtPayload;
        }
    }
}