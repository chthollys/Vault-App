import type { Wishlist, WishlistItem } from "@repo/types";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { WishlistItemDto } from "./wishlist-item.dto";

export class WishlistDto implements Wishlist {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: () => WishlistItemDto, isArray: true })
  @Expose()
  items: WishlistItem[];
}
