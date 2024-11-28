import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
export const { JWT_TOKEN, DATABASE_URL, PORT, NODE_ENV } = process.env;
