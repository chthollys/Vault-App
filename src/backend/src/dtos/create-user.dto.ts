import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";
import type { CreateUserData } from "@repo/types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto implements CreateUserData {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  image?: string;
}
