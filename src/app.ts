import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import morgan from "morgan";
import taskRouter from "./routes/task.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(globalErrorHandler);

export default app;
