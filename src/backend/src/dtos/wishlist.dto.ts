import type { Wishlist, WishlistItem } from "@repo/types";
import { Expose } from "class-transformer";

export class WishlistDto implements Wishlist {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  items: WishlistItem[];
}
