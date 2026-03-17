import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {
  @ApiProperty({ minLength: 6, maxLength: 6 })
  @IsString()
  @Length(6)
  otp: string;
}
