import type { AuthUser } from "src/auth/types/payload";
import "express";
import type { UserSignupStepData } from "repo/types";

declare module "express" {
  interface Request {
    user?: AuthUser;
  }

  interface Session {
    "signup-state"?: UserSignupStepData;
  }
}
