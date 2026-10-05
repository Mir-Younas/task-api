import {
  createTask,
  deleteTask,
  fetchTaskById,
  fetchTasks,
  updateTask,
} from "../services/task.service";
import { asyncHandler } from "../utils/async-handler";
import { CreateTaskInput, UpdateTaskInput } from "../validation/task.schema";

type TaskParams = {
  taskId: string;
};

export const handleCreateTask = asyncHandler<CreateTaskInput>(
  async (req, res) => {
    const user = req.user!;

    const task = await createTask(user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  },
);

export const handleFetchTasks = asyncHandler(async (_req, res) => {
  const tasks = await fetchTasks();

  return res.status(200).json({
    success: true,
    tasks,
  });
});

export const handleFetchTaskById = asyncHandler<
  Record<string, never>,
  TaskParams
>(async (req, res) => {
  const task = await fetchTaskById(req.params.taskId);

  return res.status(200).json({
    success: true,
    task,
  });
});

export const handleUpdateTask = asyncHandler<UpdateTaskInput, TaskParams>(
  async (req, res) => {
    const user = req.user!;

    const task = await updateTask(
      req.params.taskId,
      user.id,
      user.role,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  },
);

export const handleDeleteTask = asyncHandler<Record<string, never>, TaskParams>(
  async (req, res) => {
    const user = req.user!;

    await deleteTask(req.params.taskId, user.id, user.role);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  },
);
