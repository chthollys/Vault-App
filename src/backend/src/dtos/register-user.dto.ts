import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";
import type { CreateUserData } from "@repo/types";

export class RegisterUserDto implements CreateUserData {
  @IsEmail()
  email: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
