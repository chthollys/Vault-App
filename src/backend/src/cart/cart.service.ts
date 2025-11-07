import { Injectable } from "@nestjs/common";
import { CartRepository } from "./cart.repository";
import type { CartDto } from "src/dtos";

@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  createCart(userId: string) {
    return this.cartRepo.createCart(userId);
  }

  maybeGetCartByUserId(userId: string): Promise<CartDto | null> {
    return this.cartRepo.findCartByUserId(userId);
  }

  getCartItemsByUserId(userId: string) {
    return this.cartRepo.findCartItemsByUserId(userId);
  }

  async addCartItem(userId: string, gameId: string) {
    const cartId = await this.cartRepo.findCartIdByUserId(userId);
    return this.cartRepo.createCartItem(cartId, gameId);
  }

  removeCartItem(itemId: string) {
    return this.cartRepo.deleteCartItem(itemId);
  }
}
