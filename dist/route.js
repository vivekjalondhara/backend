"use strict";
// src/routes/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./module/Task/routes"));
const routes_2 = __importDefault(require("./module/auth/routes"));
const configureRoutes = (app) => {
    app.use("/api/task", (0, routes_1.default)());
    app.use("/api/auth", (0, routes_2.default)());
};
exports.default = configureRoutes;
