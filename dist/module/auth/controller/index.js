"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../../model/user.model"));
const general_response_1 = require("../../../general-response");
// Register a new user
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return (0, general_response_1.generalResponse)(res, null, "Email already registered", "error", true, 400);
        }
        const user = new user_model_1.default({ name, email, password });
        await user.save();
        return (0, general_response_1.generalResponse)(res, null, "User registered successfully", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return (0, general_response_1.generalResponse)(res, null, "Invalid credentials", "error", true, 400);
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return (0, general_response_1.generalResponse)(res, null, "Invalid credentials", "error", true, 400);
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const data = { user, token };
        (0, general_response_1.generalResponse)(res, data, "Login successful", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.loginUser = loginUser;
const getLoggedInUser = async (req, res, next) => {
    const { email } = req?.TokenData;
    try {
        const user = await user_model_1.default.findOne({ email: email })
            .select("email name")
            .lean();
        return (0, general_response_1.generalResponse)(res, { ...user }, "success", "success", true, 200);
    }
    catch (err) {
        return next(err);
    }
};
exports.getLoggedInUser = getLoggedInUser;
