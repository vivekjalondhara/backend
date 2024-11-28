"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_schema_1 = require("../validation-schema");
const controller_1 = require("../controller");
const validation_middlware_1 = require("../../../middlware/validation.middlware");
const middlware_1 = __importDefault(require("../middlware"));
const authRoute = () => {
    const router = (0, express_1.Router)();
    router.post("/register", (0, validation_middlware_1.validationMiddleware)(validation_schema_1.RegisterSchema, "body"), controller_1.registerUser);
    router.post("/login", (0, validation_middlware_1.validationMiddleware)(validation_schema_1.LoginSchema, "body"), controller_1.loginUser);
    router.get("/logged-in-user", middlware_1.default, controller_1.getLoggedInUser);
    return router;
};
exports.default = authRoute;
