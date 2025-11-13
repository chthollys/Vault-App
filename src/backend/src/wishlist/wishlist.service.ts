import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { WishlistRepository } from "./wishlist.repository";
import { WishlistDto } from "src/dtos";
import type { WishlistItem } from "@repo/types";

@Injectable()
export class WishlistService {
  constructor(private wishlistRepo: WishlistRepository) {}

  async getWishlistNyUserId(userId: string): Promise<WishlistDto> {
    const existingWishlist = await this.wishlistRepo.findByUserId(userId);
    if (!existingWishlist)
      throw new InternalServerErrorException(
        "Authorized user has invalid wishlist, please check the logic behind wishlist initialization",
      );
    return existingWishlist;
  }

  async createWishlistItem(
    userId: string,
    gameId: string,
  ): Promise<WishlistItem> {
    const existingWishlistId = await this.wishlistRepo.findWishlistId(userId);

    if (!existingWishlistId)
      throw new BadRequestException("User not found with valid wishlist id");

    return this.wishlistRepo.createItem(existingWishlistId, gameId);
  }

  async removeWishListItem(
    userId: string,
    gameId: string,
  ): Promise<WishlistItem> {
    const existingWishlistId = await this.wishlistRepo.findWishlistId(userId);

    if (!existingWishlistId)
      throw new BadRequestException("User not found with valid wishlist id");

    const isItemExist = await this.wishlistRepo.findWishlistItemId(
      existingWishlistId,
      gameId,
    );

    if (!isItemExist)
      throw new BadRequestException("Wishlist item is not exist");

    return this.wishlistRepo.removeItem(existingWishlistId, gameId);
  }
}
