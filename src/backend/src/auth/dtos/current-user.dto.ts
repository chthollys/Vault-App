import { Expose } from "class-transformer";
import type { AuthUser } from "../interfaces/jwt";
import { UserSessionDto } from "@repo/types";

export class CurrentUserDto implements UserSessionDto {
  @Expose()
  user: AuthUser | null;
}
