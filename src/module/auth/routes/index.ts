import { Router } from "express";
import { LoginSchema, RegisterSchema } from "../validation-schema";
import { getLoggedInUser, loginUser, registerUser } from "../controller";
import { validationMiddleware } from "../../../middlware/validation.middlware";
import authMiddleware from "../middlware";

const authRoute = (): Router => {
  const router: Router = Router();
  router.post(
    "/register",
    validationMiddleware(RegisterSchema, "body"),
    registerUser
  );
  router.post("/login", validationMiddleware(LoginSchema, "body"), loginUser);
  router.get("/logged-in-user", authMiddleware, getLoggedInUser);

  return router;
};

export default authRoute;
