import type { CartItem, Game } from "@repo/types";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { GameDto } from "./game.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CartItemDto implements CartItem {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  cartId: string;

  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty({ type: String, format: "date-time" })
  @IsDate()
  addedAt: Date;

  @ApiProperty()
  @IsBoolean()
  isChecked: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: () => GameDto })
  @Type(() => GameDto)
  game: GameDto;
}
