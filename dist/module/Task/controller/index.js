"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTask = exports.getAllTask = exports.createTask = void 0;
const general_response_1 = require("../../../general-response");
const taskboard_model_1 = __importDefault(require("../../../model/taskboard.model"));
const createTask = async (req, res, next) => {
    const { title, description, status, id } = req.body;
    const { userId } = req.TokenData;
    try {
        if (id) {
            const task = await taskboard_model_1.default.findById(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            task.title = title || task.title;
            task.description = description || task.description;
            task.status = status || task.status;
            task.updatedBy = task.updatedBy;
            task.updatedAt = new Date();
            await task.save();
            return (0, general_response_1.generalResponse)(res, task, "Task update successfully", "success", true, 200);
        }
        else {
            const task = new taskboard_model_1.default({
                title,
                description,
                status,
                createdBy: userId,
                updatedBy: userId,
            });
            task.save();
            return (0, general_response_1.generalResponse)(res, task, "Task create successfully", "success", true, 201);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.createTask = createTask;
const getAllTask = async (req, res, next) => {
    try {
        const { userId } = req.TokenData;
        console.log({ userId });
        const allTask = await taskboard_model_1.default.find({ createdBy: userId });
        return (0, general_response_1.generalResponse)(res, allTask, "Tasks fetched successfully", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.getAllTask = getAllTask;
const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await taskboard_model_1.default.findById(id);
        if (!task) {
            return (0, general_response_1.generalResponse)(res, null, "Task not found", "error", true, 404);
        }
        return (0, general_response_1.generalResponse)(res, task, "Task retrieved successfully", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.getTask = getTask;
const deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const task = await taskboard_model_1.default.findById(taskId);
        if (!task) {
            return (0, general_response_1.generalResponse)(res, null, "Task not found", "error", true, 404);
        }
        await taskboard_model_1.default.deleteOne({ _id: taskId });
        return (0, general_response_1.generalResponse)(res, null, "Task deleted successfully", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteTask = deleteTask;
