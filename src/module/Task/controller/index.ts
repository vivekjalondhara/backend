import { Request, Response, NextFunction } from "express";
import { generalResponse } from "../../../general-response";
import Task from "../../../model/taskboard.model";

export const createTask = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { title, description, status, id } = req.body;
  const { userId } = req.TokenData;

  try {
    if (id) {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.updatedBy = task.updatedBy;
      task.updatedAt = new Date();
      await task.save();
      return generalResponse(
        res,
        task,
        "Task update successfully",
        "success",
        true,
        200
      );
    } else {
      const task = new Task({
        title,
        description,
        status,
        createdBy: userId,
        updatedBy: userId,
      });
      task.save();
      return generalResponse(
        res,
        task,
        "Task create successfully",
        "success",
        true,
        201
      );
    }
  } catch (err) {
    return next(err);
  }
};

export const getAllTask = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  try {
    const { userId } = req.TokenData;

    const { search } = req.query;
    let query: any = { createdBy: userId };

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } },
        ],
      };
    }

    const allTask = await Task.find(query);

    return generalResponse(
      res,
      allTask,
      "Tasks fetched successfully",
      "success",
      true,
      200
    );
  } catch (err) {
    return next(err);
  }
};
export const getTask = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return generalResponse(res, null, "Task not found", "error", true, 404);
    }

    return generalResponse(
      res,
      task,
      "Task retrieved successfully",
      "success",
      true,
      200
    );
  } catch (err) {
    return next(err);
  }
};

export const deleteTask = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return generalResponse(res, null, "Task not found", "error", true, 404);
    }

    await Task.deleteOne({ _id: taskId });

    return generalResponse(
      res,
      null,
      "Task deleted successfully",
      "success",
      true,
      200
    );
  } catch (err) {
    return next(err);
  }
};
