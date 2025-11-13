import { Module } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";
import { WishlistRepository } from "./wishlist.repository";

@Module({
  providers: [WishlistService, WishlistRepository],
  controllers: [WishlistController],
})
export class WishlistModule {}
