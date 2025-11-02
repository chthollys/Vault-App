import type { UserDto as User } from "@repo/types";
import { IsDate, IsEmail, IsOptional, IsString, IsUrl } from "class-validator";
import { Expose } from "class-transformer";
export class UserDto implements User {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsOptional()
  @IsString()
  name: string | null;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  phone: string | null;

  @Expose()
  @IsString()
  password: string | null;

  @Expose()
  @IsString()
  address: string | null;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsDate()
  emailVerified: Date | null;

  @Expose()
  @IsUrl()
  image: string | null;
}
