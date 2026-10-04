import { Request, Response } from "express";

import { loginUser, signupUser } from "../services/auth.service";
import { LoginInput, SignupInput } from "../validation/auth.schema";
import {
  clearAccessTokenCookie,
  setAccessTokenCookie,
} from "../utils/auth-cookie";
import { asyncHandler } from "../utils/async-handler";

export const signup = asyncHandler<SignupInput>(async (req, res) => {
  const user = await signupUser(req.body);

  res.status(201).json({
    success: true,
    message: "Account created successfully. Please log in.",
    user,
  });
});

export const login = asyncHandler<LoginInput>(async (req, res) => {
  const { user, accessToken } = await loginUser(req.body);

  setAccessTokenCookie(res, accessToken);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
  });
});

export const logout = (_req: Request, res: Response): void => {
  clearAccessTokenCookie(res);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
