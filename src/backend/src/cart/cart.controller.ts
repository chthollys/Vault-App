import { Controller, Get, Param, UseGuards } from "@nestjs/common";
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

  @Get("/:id")
  getCartById(@Param("id") id: string) {
    return this.cartService.getCartById(id);
  }

  // @Get("/user/:id")
  // getCartByUserId(@Param("id") id: string) {
  //   return this.cartService.maybeGetCartByUserId(id);
  // }
}
