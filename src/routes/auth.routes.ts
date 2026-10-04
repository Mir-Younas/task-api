import { Router } from "express";

import { login, logout, signup } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, signupSchema } from "../validation/auth.schema";

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), signup);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;