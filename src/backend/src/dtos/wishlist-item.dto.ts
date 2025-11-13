import type { WishlistItem } from "@repo/types";
import { Expose } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class WishlistItemDto implements WishlistItem {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  gameId: string;

  @Expose()
  @IsString()
  wishlistId: string;

  @Expose()
  @IsDate()
  addedAt: Date;
}
