import { IsString } from "class-validator";

export class CreateWishlistItemDto {
  @IsString()
  gameId: string;
}
