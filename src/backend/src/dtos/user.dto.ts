import { Expose } from "class-transformer";
import type { UserDto as User } from "repo/types";
export class UserDto implements User {
  @Expose() id: string;

  @Expose()
  name: string | null;

  @Expose() email: string;
  @Expose() phone: string | null;
  @Expose() password: string | null;
  @Expose() address: string | null;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  @Expose() emailVerified: Date | null;
  @Expose() image: string | null;
}
