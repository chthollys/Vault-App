import type { AuthUser } from "src/auth/interfaces/jwt";
import "express";
import "express-session";
import type { UserSignupState } from "src/auth/interfaces/signup-state";

declare module "express" {
  interface Request {
    user?: AuthUser;
  }
}

declare module "express-session" {
  interface Session {
    "signup-state"?: UserSignupState;
  }
}
