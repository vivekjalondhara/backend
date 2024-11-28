"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../../model/user.model"));
const general_response_1 = require("../../../general-response");
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return (0, general_response_1.generalResponse)(res, null, "Authentication required", "error", true, 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.default.findOne({ email: decoded.email });
        if (!user) {
            return (0, general_response_1.generalResponse)(res, null, "User not founds", "error", true, 401);
        }
        req.TokenData = {
            email: user.email,
            userId: user._id,
            username: user.name,
        };
        next();
    }
    catch (error) {
        return (0, general_response_1.generalResponse)(res, null, "Invalid or expired token", "error", true, 401);
    }
};
exports.default = authMiddleware;
