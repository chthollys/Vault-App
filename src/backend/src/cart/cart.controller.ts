import {
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

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@User() user: AuthUser) {
    return this.cartService.maybeGetCartByUserId(user.id);
  }

  @Post("/add/:id")
  addCartItem(@User() user: AuthUser, @Param("id") gameId: string) {
    return this.cartService.addCartItem(user.id, gameId);
  }

  @Delete("/remove/:id")
  removeCartItem(@Param("id") itemId: string) {
    return this.cartService.removeCartItem(itemId);
  }

  @Patch("/toggle-check/:id")
  toggleCartItem(@Param("id") itemId: string) {
    return this.cartService.toggleCartItem(itemId);
  }
}
