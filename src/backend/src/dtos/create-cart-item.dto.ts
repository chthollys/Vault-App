import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  gameId: string;
}
