import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required().label("title"),
  description: Joi.string().required().label("description"),
  status: Joi.string().label("status"),
});

export const updateTaskSchema = Joi.object({
  id: Joi.string().label("id"),
  title: Joi.string().required().label("title"),
  description: Joi.string().required().label("description"),
  status: Joi.string().label("status"),
});

export const deleteTaskSchema = Joi.object({
  taskId: Joi.string().required().label("taskId"),
});

export const geTaskSchema = Joi.object({
  id: Joi.string().required().label("TaskId"),
});
