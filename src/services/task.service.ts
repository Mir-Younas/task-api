import { isValidObjectId } from "mongoose";

import { UserRole } from "../constants/auth.constants";
import { Task } from "../models/task.model";
import { AppError } from "../utils/app-error";
import { CreateTaskInput, UpdateTaskInput } from "../validation/task.schema";

const validateTaskId = (taskId: string) => {
  if (!isValidObjectId(taskId)) {
    throw new AppError("Invalid task ID", 400);
  }
};

const findTaskOrThrow = async (taskId: string) => {
  validateTaskId(taskId);

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const createTask = async (userId: string, body: CreateTaskInput) => {
  return Task.create({
    ...body,
    author: userId,
  });
};

export const fetchTasks = async () => {
  return Task.find().populate("author", "name email").sort({ createdAt: -1 });
};

export const fetchTaskById = async (taskId: string) => {
  const task = await findTaskOrThrow(taskId);

  await task.populate("author", "name email");

  return task;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  userRole: UserRole,
  body: UpdateTaskInput,
) => {
  const task = await findTaskOrThrow(taskId);

  const isAuthor = task.author.toString() === userId;
  const isAdmin = userRole === UserRole.ADMIN;

  if (!isAuthor && !isAdmin) {
    throw new AppError("You are not allowed to update this task", 403);
  }

  Object.assign(task, body);

  await task.save();

  return task;
};

export const deleteTask = async (
  taskId: string,
  userId: string,
  userRole: UserRole,
) => {
  const task = await findTaskOrThrow(taskId);

  const isAuthor = task.author.toString() === userId;
  const isAdmin = userRole === UserRole.ADMIN;

  if (!isAuthor && !isAdmin) {
    throw new AppError("You are not allowed to delete this task", 403);
  }

  await task.deleteOne();

  return task;
};
