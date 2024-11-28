// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      TokenData?: {
        userId: string;
        username: string;
        email: string;
      };
    }
  }
}
