import { Router } from "express";

import {
  handleCreateTask,
  handleDeleteTask,
  handleFetchTaskById,
  handleFetchTasks,
  handleUpdateTask,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../validation/task.schema";

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.post("/", validate(createTaskSchema), handleCreateTask);

taskRouter.get("/", handleFetchTasks);

taskRouter.get("/:taskId", handleFetchTaskById);

taskRouter.patch("/:taskId", validate(updateTaskSchema), handleUpdateTask);

taskRouter.delete("/:taskId", handleDeleteTask);

export default taskRouter;
