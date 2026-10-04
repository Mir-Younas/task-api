import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

import { AppError } from "../utils/app-error";

export const validate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issue = result.error.issues[0];

      const field = issue?.path.join(".");
      const message = issue
        ? field
          ? `${field}: ${issue.message}`
          : issue.message
        : "Invalid request data";

      return next(new AppError(message, 400));
    }

    req.body = result.data;

    next();
  };