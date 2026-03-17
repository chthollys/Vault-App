import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import type { AuthUser } from "src/auth/interfaces/jwt";
import { User } from "src/decorators/current-user.decorator";
import { CreateCartItemDto } from "src/dtos";
import { CartDto } from "src/dtos/cart.dto";
import { CartItemDto } from "src/dtos/cart-item.dto";
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

@Controller("cart")
@UseGuards(JwtAuthGuard)
@ApiTags("Cart")
@ApiBearerAuth("access_token")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: "Get current user cart" })
  @ApiOkWrappedResponse({ type: CartDto, description: "Current cart or null data" })
  @ApiCommonErrorResponses()
  getCart(@User() user: AuthUser) {
    return this.cartService.maybeGetCartByUserId(user.id);
  }

  @Post("/add")
  @ApiOperation({ summary: "Add item to cart" })
  @ApiBody({ type: CreateCartItemDto })
  @ApiCreatedWrappedResponse({ type: CartItemDto })
  @ApiCommonErrorResponses()
  addCartItem(@User() user: AuthUser, @Body() body: CreateCartItemDto) {
    return this.cartService.addCartItem(user.id, body.gameId);
  }

  @Delete("/remove/:id")
  @ApiOperation({ summary: "Remove item from cart" })
  @ApiParam({ name: "id", description: "Cart item id" })
  @ApiOkWrappedResponse({ type: CartItemDto })
  @ApiCommonErrorResponses()
  removeCartItem(@User() user: AuthUser, @Param("id") itemId: string) {
    return this.cartService.removeCartItem(user.id, itemId);
  }

  @Patch("/toggle-check/:id")
  @ApiOperation({ summary: "Toggle cart item checked status" })
  @ApiParam({ name: "id", description: "Cart item id" })
  @ApiOkWrappedResponse({ type: CartItemDto })
  @ApiCommonErrorResponses()
  toggleCartItem(@Param("id") itemId: string) {
    return this.cartService.toggleCartItem(itemId);
  }
}
