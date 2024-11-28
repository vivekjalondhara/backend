import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../model/user.model";
import { generalResponse } from "../../../general-response";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return generalResponse(
        res,
        null,
        "Email already registered",
        "error",
        true,
        400
      );
    }
    const user = new User({ name, email, password });
    await user.save();
    return generalResponse(
      res,
      null,
      "User registered successfully",
      "success",
      true,
      200
    );
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return generalResponse(
        res,
        null,
        "Invalid credentials",
        "error",
        true,
        400
      );
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return generalResponse(
        res,
        null,
        "Invalid credentials",
        "error",
        true,
        400
      );
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    const data = { user, token };
    generalResponse(res, data, "Login successful", "success", true, 200);
  } catch (err) {
    return next(err);
  }
};

export const getLoggedInUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { email } = req?.TokenData;
  try {
    const user = await User.findOne({ email: email })
      .select("email name")
      .lean();
    return generalResponse(res, { ...user }, "success", "success", true, 200);
  } catch (err) {
    return next(err);
  }
};
