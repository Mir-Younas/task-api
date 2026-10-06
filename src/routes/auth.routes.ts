import { Router } from "express";

import { login, logout, signup } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, signupSchema } from "../validation/auth.schema";
import { loginRateLimiter } from "../middleware/rate-limit.middleware";

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), signup);
authRouter.post("/login", loginRateLimiter, validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;