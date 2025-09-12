import type { AuthUser } from "src/auth/types/payload";
import "express";

declare module "express" {
  interface Request {
    user?: AuthUser;
  }
}
