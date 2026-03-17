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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiCreatedWrappedResponse,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("wishlist")
@UseGuards(JwtAuthGuard)
@ApiTags("Wishlist")
@ApiBearerAuth("access_token")
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get("/my-list")
  @Serialize(WishlistDto)
  @ApiOperation({ summary: "Get current user wishlist" })
  @ApiOkWrappedResponse({ type: WishlistDto })
  @ApiCommonErrorResponses()
  getWishlist(@User() user: AuthUser) {
    return this.wishlistService.getWishlistNyUserId(user.id);
  }

  @Post("/my-list")
  @Serialize(WishlistItemDto)
  @ApiOperation({ summary: "Add item to wishlist" })
  @ApiBody({ type: CreateWishlistItemDto })
  @ApiCreatedWrappedResponse({ type: WishlistItemDto })
  @ApiCommonErrorResponses()
  createWishlistItem(
    @User() user: AuthUser,
    @Body() body: CreateWishlistItemDto,
  ) {
    return this.wishlistService.createWishlistItem(user.id, body.gameId);
  }

  @Delete("/my-list/:gameId")
  @Serialize(WishlistItemDto)
  @ApiOperation({ summary: "Remove item from wishlist" })
  @ApiParam({ name: "gameId", description: "Game id" })
  @ApiOkWrappedResponse({ type: WishlistItemDto })
  @ApiCommonErrorResponses()
  removeItemInWishlist(
    @User() user: AuthUser,
    @Param("gameId") gameId: string,
  ) {
    return this.wishlistService.removeWishListItem(user.id, gameId);
  }
}
