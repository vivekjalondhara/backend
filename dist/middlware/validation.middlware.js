"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.cleanObj = exports.isNumeric = void 0;
const general_response_1 = require("../general-response");
const errorFilterValidator = (error) => {
    const extractedErrors = [];
    error.forEach((err) => extractedErrors.push(err.message));
    const errorResponse = extractedErrors.join("\n");
    return errorResponse;
};
const validateFields = (error, res) => {
    if (error.details) {
        const errorResponse = errorFilterValidator(error.details);
        return (0, general_response_1.generalResponse)(res, "Something went wrong!", errorResponse, "error", false, 422);
    }
};
const isNumeric = (n) => {
    // eslint-disable-next-line no-restricted-globals
    return n && !isNaN(parseFloat(n)) && isFinite(n);
};
exports.isNumeric = isNumeric;
const cleanObj = (obj) => {
    Object.keys(obj).forEach((key) => {
        try {
            if (obj[key] === "") {
                obj[key] = null;
            }
            if (!(0, exports.isNumeric)(obj[key])) {
                obj[key] = JSON.parse(obj[key]);
            }
        }
        catch (err) {
            // do nothing
        }
    });
    return obj;
};
exports.cleanObj = cleanObj;
const validationMiddleware = (type, value = "body") => {
    return async (req, res, next) => {
        try {
            (0, exports.cleanObj)(req[value]);
            req[value] = await type.validateAsync(req[value]);
            return next(); // Proceed to the next middleware
        }
        catch (e) {
            const error = e;
            const errorObj = {};
            if (error.details) {
                const errorResponse = errorFilterValidator(error.details);
                (0, general_response_1.generalResponse)(res, "Something went wrong!", errorResponse, "error", false, 422);
                return;
            }
            error?.details?.map((item) => {
                errorObj[item.context.key] = item.message;
            });
            console.warn(error, "error");
            (0, general_response_1.generalResponse)(res, null, "Something went wrong!", "success", false, 400);
            return;
        }
    };
};
exports.validationMiddleware = validationMiddleware;
