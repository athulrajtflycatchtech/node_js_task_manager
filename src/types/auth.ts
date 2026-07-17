import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}