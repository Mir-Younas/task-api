import { Schema, model, Types } from "mongoose";
import { TaskStatus } from "../constants/task.constants";

export type TaskType = {
  title: string;
  description: string;
  status: TaskStatus;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const taskSchema = new Schema<TaskType>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model<TaskType>("Task", taskSchema);
