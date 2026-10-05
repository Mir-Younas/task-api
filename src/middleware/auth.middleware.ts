import { NextFunction, Request, Response } from "express";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  UserStatus,
} from "../constants/auth.constants";
import { User } from "../models/user.model";
import { AppError } from "../utils/app-error";
import { asyncHandler } from "../utils/async-handler";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken || typeof accessToken !== "string") {
      throw new AppError("Authentication required", 401);
    }

    let userId: string;

    try {
      const payload = verifyAccessToken(accessToken);

      userId = payload.userId;
    } catch {
      throw new AppError("Invalid or expired access token", 401);
    }

    const user = await User.findById(userId).select(
      "_id name email role status",
    );

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new AppError("Your account has been blocked", 403);
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  },
);
