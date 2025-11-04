import { IsEmail, IsOptional } from "class-validator";

export class UsersFilterDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  reviewId?: string;
}
