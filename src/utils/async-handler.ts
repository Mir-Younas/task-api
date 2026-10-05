import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { ParamsDictionary } from "express-serve-static-core";

export const asyncHandler = <
  ReqBody = Record<string, never>,
  ReqParams extends ParamsDictionary = ParamsDictionary,
>(
  fn: (
    req: Request<ReqParams, object, ReqBody>,
    res: Response<object>,
    next: NextFunction,
  ) => Promise<Response<object> | void>,
): RequestHandler<ReqParams, object, ReqBody> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};