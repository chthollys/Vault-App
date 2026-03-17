import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetPasswordDto {
  @ApiProperty()
  @IsString()
  password: string;
}
