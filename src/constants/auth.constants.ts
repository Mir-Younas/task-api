export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 60 * 60;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}