import { UserRole } from "../constants/auth.constants";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
         role: UserRole;
      };
    }
  }
}

export {};