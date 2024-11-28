import { Router } from "express";
import { createTask, deleteTask, getAllTask, getTask } from "../controller";
import authMiddleware from "../../auth/middlware";
import {
  createTaskSchema,
  deleteTaskSchema,
  geTaskSchema,
} from "../validation-schema";
import { validationMiddleware } from "../../../middlware/validation.middlware";

const taskRoute = () => {
  const router: Router = Router();

  router.post(
    "/create",
    authMiddleware,
    validationMiddleware(createTaskSchema, "body"),
    createTask
  );
  router.get("/get", authMiddleware, getAllTask);

  router.post(
    "/delete/:taskId",
    authMiddleware,
    validationMiddleware(deleteTaskSchema, "params"),
    deleteTask
  );
  router.get(
    "/get/:id",
    authMiddleware,
    validationMiddleware(geTaskSchema, "params"),
    getTask
  );

  return router;
};
export default taskRoute;
