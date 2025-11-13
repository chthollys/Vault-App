import { Injectable } from "@nestjs/common";
import type { Wishlist, WishlistItem } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

type WishlistObj = Wishlist & { items: WishlistItem[] };

@Injectable()
export class WishlistRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findByUserId(userId: string): Promise<WishlistObj | null> {
    try {
      return await this.prisma.wishlist.findUnique({
        where: { userId },
        include: { items: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch wishlist");
    }
  }

  async findWishlistId(userId: string): Promise<string | null> {
    try {
      const wishlist = await this.prisma.wishlist.findUnique({
        where: { userId },
        select: { id: true },
      });
      return wishlist?.id ?? null;
    } catch (err) {
      return this.errorHandler(err, "Failed to find id of wishlist");
    }
  }

  async findWishlistItemId(
    wishlistId: string,
    gameId: string,
  ): Promise<string | null> {
    try {
      const item = await this.prisma.wishlistItem.findUnique({
        where: { wishlistId_gameId: { wishlistId, gameId } },
      });
      return item?.id ?? null;
    } catch (err) {
      return this.errorHandler(err, "Failed to find id of wishlist item");
    }
  }

  async createItem(wishlistId: string, gameId: string): Promise<WishlistItem> {
    try {
      return await this.prisma.wishlistItem.create({
        data: { gameId, wishlistId },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to create wishlist item");
    }
  }

  async removeItem(wishlistId: string, gameId: string): Promise<WishlistItem> {
    try {
      return await this.prisma.wishlistItem.delete({
        where: { wishlistId_gameId: { gameId, wishlistId } },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to delete wishlist item");
    }
  }
}
