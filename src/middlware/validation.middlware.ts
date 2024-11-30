// ** Package **
import { NextFunction, Request, RequestHandler, Response } from "express";

// ** Helper **
import _ from "lodash";
import Joi from "joi";
import { generalResponse } from "../general-response";

type ErrorType = {
  message: string;
  path: Object;
  type: string;
  context: any;
};

export type MultiSchemaValidateData = {
  schema: Joi.Schema;
  key?: "body" | "query" | "params";
};

const errorFilterValidator = (error: ErrorType[]) => {
  const extractedErrors: string[] = [];
  error.forEach((err: ErrorType) => extractedErrors.push(err.message));
  const errorResponse = extractedErrors.join("\n");
  return errorResponse;
};

const validateFields = (error: any, res: any) => {
  if (error.details) {
    const errorResponse = errorFilterValidator(error.details);
    return generalResponse(
      res,
      "Something went wrong!",
      errorResponse,
      "error",
      false,
      422
    );
  }
};
export const isNumeric = (n: any) => {
  // eslint-disable-next-line no-restricted-globals
  return n && !isNaN(parseFloat(n)) && isFinite(n);
};
export const cleanObj = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key: string) => {
    try {
      if (obj[key] === "") {
        obj[key] = null;
      }
      if (!isNumeric(obj[key])) {
        obj[key] = JSON.parse(obj[key]);
      }
    } catch (err) {}
  });
  return obj;
};

export const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" = "body"
): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      cleanObj(req[value]);
      req[value] = await type.validateAsync(req[value]);
      return next();
    } catch (e) {
      const error: any = e;
      const errorObj: { [key: string]: string } = {};

      if (error.details) {
        const errorResponse = errorFilterValidator(error.details);
        generalResponse(
          res,
          "Something went wrong!",
          errorResponse,
          "error",
          false,
          422
        );
        return;
      }

      error?.details?.map((item: any) => {
        errorObj[item.context.key] = item.message;
      });

      console.warn(error, "error");

      generalResponse(
        res,
        null,
        "Something went wrong!",
        "success",
        false,
        400
      );
      return;
    }
  };
};
