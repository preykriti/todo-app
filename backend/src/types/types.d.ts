import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload{
    id: string;
}

declare global{
    namespace Express{
        interface Request{
            user?: string | JwtPayload |CustomJwtPayload;
        }
    }
}