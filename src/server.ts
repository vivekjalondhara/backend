import express, { Application, Request, Response } from "express";
import cors from "cors";
import dbConnection from "./model";
import { createServer, Server } from "http";
import dotenv from "dotenv";
import configureRoutes from "./route";
import { PORT } from "./config";

const main = async () => {
  const app: Application = express();
  const port: string | number = PORT || 5000;

  dotenv.config();

  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  dbConnection();

  app.use(express.json());
  configureRoutes(app);
  const startServer = () => {
    const server = createServer(app);

    server.listen(port, () => {
      console.log(` App listening on port ${port}`);
    });
  };
  startServer();
};
main();
