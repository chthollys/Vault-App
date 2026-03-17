import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
