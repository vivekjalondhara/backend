import { Response } from "express";

export const generalResponse = (
  response: Response,
  data: any = null,
  message: string | object,
  responseType = "success",
  toast = false,
  statusCode = 200
) => {
  return response.status(statusCode).send({
    data: JSON.parse(JSON.stringify(data)),
    message,
    toast,
    responseType,
  });
};
