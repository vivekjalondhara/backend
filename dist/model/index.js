"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const dbConnection = () => {
    mongoose_1.default.connect(config_1.DATABASE_URL || "mongodb://localhost:27017/task", {
        autoCreate: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        monitorCommands: true,
    });
    mongoose_1.default.plugin((schema) => {
        schema.set("_id", false);
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("DB connection established successfully");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("connection error: " + err);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("DB connection terminated");
    });
};
exports.default = dbConnection;
