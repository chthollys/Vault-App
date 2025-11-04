import { Controller, Get, Param } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get("/:id")
  getCartById(@Param("id") id: string) {
    return this.cartService.getCartById(id);
  }

  @Get("/user/:id")
  getCartByUserId(@Param("id") id: string) {
    return this.cartService.maybeGetCartByUserId(id);
  }
}
