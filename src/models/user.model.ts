import { Schema, model } from "mongoose";
import { UserRole, UserStatus } from "../constants/auth.constants";

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  failedLoginAttempts: number;
  loginLockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
      required: true,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
      required: true,
    },

    loginLockedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserType>("User", userSchema);