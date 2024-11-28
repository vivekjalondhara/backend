import mongoose from "mongoose";
import { DATABASE_URL } from "../config";
const dbConnection = () => {
  mongoose.connect(DATABASE_URL || "mongodb://localhost:27017/task", {
    autoCreate: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    monitorCommands: true,
  });
  mongoose.plugin((schema) => {
    schema.set("_id", false);
  });

  mongoose.connection.on("connected", () => {
    console.log("DB connection established successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("connection error: " + err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("DB connection terminated");
  });
};

export default dbConnection;
