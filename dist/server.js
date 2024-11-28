"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const model_1 = __importDefault(require("./model"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = __importDefault(require("./route"));
const config_1 = require("./config");
const main = async () => {
    const app = (0, express_1.default)();
    const port = config_1.PORT || 5000;
    dotenv_1.default.config();
    app.use((0, cors_1.default)({
        credentials: true,
        origin: true,
    }));
    (0, model_1.default)();
    app.use(express_1.default.json());
    (0, route_1.default)(app);
    const startServer = () => {
        const server = (0, http_1.createServer)(app);
        server.listen(port, () => {
            console.log(` App listening on port ${port}`);
        });
    };
    startServer();
};
main();
