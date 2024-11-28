"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geTaskSchema = exports.deleteTaskSchema = exports.createTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTaskSchema = joi_1.default.object({
    id: joi_1.default.string().label("id"),
    title: joi_1.default.string().required().label("title"),
    description: joi_1.default.string().required().label("description"),
    status: joi_1.default.string().label("status"),
});
exports.deleteTaskSchema = joi_1.default.object({
    taskId: joi_1.default.string().required().label("taskId"),
});
exports.geTaskSchema = joi_1.default.object({
    id: joi_1.default.string().required().label("TaskId"),
});
