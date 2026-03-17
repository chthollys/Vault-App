import type { UserDto as User } from "@repo/types";
import { IsDate, IsEmail, IsOptional, IsString, IsUrl } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class UserDto implements User {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsString()
  phone: string | null;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsString()
  address: string | null;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({ type: String, format: "date-time", nullable: true })
  @Expose()
  @IsDate()
  emailVerified: Date | null;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsUrl()
  image: string | null;
}
