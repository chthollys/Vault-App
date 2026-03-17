import type { WishlistItem } from "@repo/types";
import { Expose } from "class-transformer";
import { IsDate, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class WishlistItemDto implements WishlistItem {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  gameId: string;

  @ApiProperty()
  @Expose()
  @IsString()
  wishlistId: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  addedAt: Date;
}
