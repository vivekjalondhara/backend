// src/routes/index.ts

import { Application, Express } from "express";
import taskRoute from "./module/Task/routes";
import authRoute from "./module/auth/routes";

const configureRoutes = (app: Application) => {
  app.use("/api/task", taskRoute());
  app.use("/api/auth", authRoute());
};

export default configureRoutes;
