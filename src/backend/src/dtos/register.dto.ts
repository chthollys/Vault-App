import { IsEmail, IsOptional, IsString } from "class-validator";
import { CreateUserData } from "repo/types";

export class RegisterDto implements CreateUserData {
  @IsEmail()
  email: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  password: string;
}
