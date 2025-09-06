import { IsEmail, IsOptional } from "class-validator";

export class UsersQueryDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  reviewId?: string;
}
