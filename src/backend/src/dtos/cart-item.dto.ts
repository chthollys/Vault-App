import type { CartItem, Game } from "@repo/types";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { GameDto } from "./game.dto";

export class CartItemDto implements CartItem {
  @IsString()
  id: string;

  @IsString()
  cartId: string;

  @IsString()
  gameId: string;

  @IsDate()
  addedAt: Date;

  @IsBoolean()
  isChecked: boolean;

  @IsNumber()
  quantity: number;

  @Type(() => GameDto)
  game: GameDto;
}
