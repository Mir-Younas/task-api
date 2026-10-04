import {
  CookieOptions,
  Response,
} from 'express';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS,
} from '../constants/auth.constants';

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

const accessTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000,
};

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string,
): void => {
  res.cookie(
    ACCESS_TOKEN_COOKIE_NAME,
    accessToken,
    accessTokenCookieOptions,
  );
};

export const clearAccessTokenCookie = (
  res: Response,
): void => {
  res.clearCookie(
    ACCESS_TOKEN_COOKIE_NAME,
    baseCookieOptions,
  );
};