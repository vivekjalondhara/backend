"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_schema_1 = require("../../../joi-schema");
exports.RegisterSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .max(50)
        .label("Name")
        .messages({ ...joi_schema_1.errorMessage }),
    email: joi_1.default.string()
        .required()
        .max(100)
        .email()
        .label("Email")
        .lowercase()
        .options({ convert: true })
        .messages({
        ...joi_schema_1.errorMessage,
        "string.email": "{#label} must be a valid email",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(30)
        .required()
        .label("Password")
        .messages({
        ...joi_schema_1.errorMessage,
        "string.pattern.base": "{#label} must have at least one uppercase character, one lowercase character, one numeric character and one special character",
    }),
});
exports.LoginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .max(100)
        .email()
        .label("Email")
        .lowercase()
        .options({ convert: true })
        .messages({
        ...joi_schema_1.errorMessage,
        "string.email": "{#label} must be a valid email",
    }),
    password: joi_1.default.string().required().label("Password"),
});
