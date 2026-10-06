export const getLoginCooldownMs = (failedAttempts: number): number => {
  if (failedAttempts >= 8) {
    return 15 * 60 * 1000; // 15 minutes
  }

  if (failedAttempts === 7) {
    return 5 * 60 * 1000; // 5 minutes
  }

  if (failedAttempts === 6) {
    return 60 * 1000; // 1 minute
  }

  if (failedAttempts === 5) {
    return 30 * 1000; // 30 seconds
  }

  return 0;
};

export const getRetryAfterSeconds = (lockedUntil: Date): number => {
  return Math.max(
    0,
    Math.ceil((lockedUntil.getTime() - Date.now()) / 1000),
  );
};