"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const middlware_1 = __importDefault(require("../../auth/middlware"));
const validation_schema_1 = require("../validation-schema");
const validation_middlware_1 = require("../../../middlware/validation.middlware");
const taskRoute = () => {
    const router = (0, express_1.Router)();
    router.post("/create", middlware_1.default, (0, validation_middlware_1.validationMiddleware)(validation_schema_1.createTaskSchema, "body"), controller_1.createTask);
    router.get("/get", middlware_1.default, controller_1.getAllTask);
    router.post("/delete/:taskId", middlware_1.default, (0, validation_middlware_1.validationMiddleware)(validation_schema_1.deleteTaskSchema, "params"), controller_1.deleteTask);
    router.get("/get/:id", middlware_1.default, (0, validation_middlware_1.validationMiddleware)(validation_schema_1.geTaskSchema, "params"), controller_1.getTask);
    return router;
};
exports.default = taskRoute;
