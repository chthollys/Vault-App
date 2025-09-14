import type { AuthUser } from "src/auth/types/payload";
import "express";
import "express-session";
import type { UserSignupStepData } from "repo/types";

declare module "express" {
  interface Request {
    user?: AuthUser;
  }
}

declare module "express-session" {
  interface Session {
    "signup-state"?: UserSignupStepData;
  }
}
