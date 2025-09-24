import { IsString, Length } from "class-validator";

export class VerifyOtpDto {
  @IsString()
  @Length(6)
  otp: string;
}
