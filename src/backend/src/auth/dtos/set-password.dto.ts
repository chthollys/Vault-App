import { IsString } from "class-validator";

export class SetPasswordDto {
  @IsString()
  password: string;
}
