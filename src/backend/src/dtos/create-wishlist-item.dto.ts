import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWishlistItemDto {
  @ApiProperty()
  @IsString()
  gameId: string;
}
