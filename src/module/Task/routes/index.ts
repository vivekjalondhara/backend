import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controller";
import authMiddleware from "../../auth/middlware";
import {
  createTaskSchema,
  deleteTaskSchema,
  geTaskSchema,
  updateTaskSchema,
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
  router.put(
    "/update",
    authMiddleware,
    validationMiddleware(updateTaskSchema, "body"),
    updateTask
  );
  router.get("/get", authMiddleware, getAllTask);

  router.delete(
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
