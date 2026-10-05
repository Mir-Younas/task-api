import { z } from "zod";

import { TaskStatus } from "../constants/task.constants";

export const createTaskSchema = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string({
      error: "Description is required",
    })
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  status: z
    .enum(TaskStatus, {
      error: "Invalid task status",
    })
    .optional(),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;