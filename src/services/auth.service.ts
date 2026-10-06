import bcrypt from "bcryptjs";

import { User } from "../models/user.model";
import { AppError } from "../utils/app-error";
import { generateAccessToken } from "../utils/jwt";
import { LoginInput, SignupInput } from "../validation/auth.schema";

const isDuplicateKeyError = (error: unknown): error is { code: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
};

export const signupUser = async (body: SignupInput) => {
  const existingUser = await User.findOne({
    email: body.email,
  });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);

  try {
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      throw new AppError("Email already registered", 409);
    }

    throw error;
  }
};

export const loginUser = async (body: LoginInput) => {
  const user = await User.findOne({
    email: body.email,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(body.password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};
