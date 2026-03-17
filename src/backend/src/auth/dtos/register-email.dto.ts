import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterEmailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
