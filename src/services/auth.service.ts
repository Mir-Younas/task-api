import bcrypt from "bcryptjs";

import { User } from "../models/user.model";
import { AppError } from "../utils/app-error";
import { generateAccessToken } from "../utils/jwt";
import {
  getLoginCooldownMs,
  getRetryAfterSeconds,
} from "../utils/login-security";
import { LoginInput, SignupInput } from "../validation/auth.schema";

const isDuplicateKeyError = (
  error: unknown,
): error is { code: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
};

const checkLoginCooldown = (loginLockedUntil: Date | null): void => {
  if (
    !loginLockedUntil ||
    loginLockedUntil.getTime() <= Date.now()
  ) {
    return;
  }

  const retryAfterSeconds =
    getRetryAfterSeconds(loginLockedUntil);

  throw new AppError(
    `Too many failed login attempts. Please try again in ${retryAfterSeconds} seconds.`,
    429,
  );
};

const registerFailedLogin = async (
  userId: string,
): Promise<void> => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    [
      {
        $set: {
          failedLoginAttempts: {
            $add: ["$failedLoginAttempts", 1],
          },
        },
      },
      {
        $set: {
          loginLockedUntil: {
            $switch: {
              branches: [
                {
                  case: {
                    $gte: ["$failedLoginAttempts", 8],
                  },
                  then: {
                    $dateAdd: {
                      startDate: "$$NOW",
                      unit: "minute",
                      amount: 15,
                    },
                  },
                },
                {
                  case: {
                    $eq: ["$failedLoginAttempts", 7],
                  },
                  then: {
                    $dateAdd: {
                      startDate: "$$NOW",
                      unit: "minute",
                      amount: 5,
                    },
                  },
                },
                {
                  case: {
                    $eq: ["$failedLoginAttempts", 6],
                  },
                  then: {
                    $dateAdd: {
                      startDate: "$$NOW",
                      unit: "minute",
                      amount: 1,
                    },
                  },
                },
                {
                  case: {
                    $eq: ["$failedLoginAttempts", 5],
                  },
                  then: {
                    $dateAdd: {
                      startDate: "$$NOW",
                      unit: "second",
                      amount: 30,
                    },
                  },
                },
              ],
              default: null,
            },
          },
        },
      },
    ],
    {
      new: true,
    },
  );

  if (!updatedUser) {
    throw new AppError("Invalid email or password", 401);
  }

  const cooldownMs = getLoginCooldownMs(
    updatedUser.failedLoginAttempts,
  );

  if (cooldownMs > 0) {
    throw new AppError(
      `Too many failed login attempts. Please try again in ${Math.ceil(
        cooldownMs / 1000,
      )} seconds.`,
      429,
    );
  }

  throw new AppError("Invalid email or password", 401);
};

const resetLoginSecurity = async (
  userId: string,
): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    $set: {
      failedLoginAttempts: 0,
      loginLockedUntil: null,
    },
  });
};

export const signupUser = async (body: SignupInput) => {
  const existingUser = await User.findOne({
    email: body.email,
  });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(
    body.password,
    12,
  );

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

  checkLoginCooldown(user.loginLockedUntil);

  const passwordMatches = await bcrypt.compare(
    body.password,
    user.password,
  );

  if (!passwordMatches) {
    await registerFailedLogin(user.id);
  }

  if (
    user.failedLoginAttempts > 0 ||
    user.loginLockedUntil
  ) {
    await resetLoginSecurity(user.id);
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