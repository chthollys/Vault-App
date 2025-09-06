import { Expose } from "class-transformer";
import type { User } from "repo";
export class UserDto implements User {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  password: string;

  @Expose()
  address: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  emailVerified: Date;

  @Expose()
  image: string;
}
