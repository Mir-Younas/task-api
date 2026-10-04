import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export const asyncHandler = <ReqBody = unknown>(
  fn: (
    req: Request<ParamsDictionary, unknown, ReqBody>,
    res: Response,
    next: NextFunction,
  ) => Promise<unknown>,
): RequestHandler<ParamsDictionary, unknown, ReqBody> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
