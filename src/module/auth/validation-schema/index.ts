import Joi from "joi";
import { errorMessage } from "../../../joi-schema";

export const RegisterSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(50)
    .label("Name")
    .messages({ ...errorMessage }),
  email: Joi.string()
    .required()
    .max(100)
    .email()
    .label("Email")
    .lowercase()
    .options({ convert: true })
    .messages({
      ...errorMessage,
      "string.email": "{#label} must be a valid email",
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .label("Password")
    .messages({
      ...errorMessage,
      "string.pattern.base":
        "{#label} must have at least one uppercase character, one lowercase character, one numeric character and one special character",
    }),
});

export const LoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .max(100)
    .email()
    .label("Email")
    .lowercase()
    .options({ convert: true })
    .messages({
      ...errorMessage,
      "string.email": "{#label} must be a valid email",
    }),
  password: Joi.string().required().label("Password"),
});
