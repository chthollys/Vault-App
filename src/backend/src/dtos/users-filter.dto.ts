import { IsEmail, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UsersFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  reviewId?: string;
}
