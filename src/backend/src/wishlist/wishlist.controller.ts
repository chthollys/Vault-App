import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/current-user.decorator";
import { WishlistDto } from "src/dtos/wishlist.dto";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistItemDto, WishlistItemDto } from "src/dtos";
import type { AuthUser } from "src/auth/interfaces/jwt";

@Controller("wishlist")
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get("/my-list")
  @Serialize(WishlistDto)
  getWishlist(@User() user: AuthUser) {
    return this.wishlistService.getWishlistNyUserId(user.id);
  }

  @Post("/my-list")
  @Serialize(WishlistItemDto)
  createWishlistItem(
    @User() user: AuthUser,
    @Body() body: CreateWishlistItemDto,
  ) {
    return this.wishlistService.createWishlistItem(user.id, body.gameId);
  }

  @Delete("/my-list/:gameId")
  @Serialize(WishlistItemDto)
  removeItemInWishlist(
    @User() user: AuthUser,
    @Param("gameId") gameId: string,
  ) {
    return this.wishlistService.removeWishListItem(user.id, gameId);
  }
}
