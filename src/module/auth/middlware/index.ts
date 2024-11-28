import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../../model/user.model";
import { generalResponse } from "../../../general-response";

const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return generalResponse(
      res,
      null,
      "Authentication required",
      "error",
      true,
      401
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
    };
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return generalResponse(res, null, "User not founds", "error", true, 401);
    }
    req.TokenData = {
      email: user.email,
      userId: user._id,
      username: user.name,
    };

    next();
  } catch (error) {
    return generalResponse(
      res,
      null,
      "Invalid or expired token",
      "error",
      true,
      401
    );
  }
};

export default authMiddleware;
