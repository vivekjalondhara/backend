import mongoose, { Schema, Document } from "mongoose";

interface TaskModalType {
  _id?: any;
  title: string;
  description?: string;
  status?: "Pending" | "In Progress" | "Completed";
  createdAt: Date;
  updatedAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<TaskModalType>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

taskSchema.pre<TaskModalType>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Task = mongoose.model<TaskModalType>("Task", taskSchema);
export default Task;
