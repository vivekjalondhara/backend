"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.PORT = exports.DATABASE_URL = exports.JWT_TOKEN = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: `.env.${process.env.NODE_ENV || "development"}`,
});
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
_a = process.env, exports.JWT_TOKEN = _a.JWT_TOKEN, exports.DATABASE_URL = _a.DATABASE_URL, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV;
