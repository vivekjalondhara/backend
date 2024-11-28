"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalResponse = void 0;
const generalResponse = (response, data = null, message, responseType = "success", toast = false, statusCode = 200) => {
    return response.status(statusCode).send({
        data: JSON.parse(JSON.stringify(data)),
        message,
        toast,
        responseType,
    });
};
exports.generalResponse = generalResponse;
