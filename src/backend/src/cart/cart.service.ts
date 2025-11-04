import { Injectable } from "@nestjs/common";
import { CartRepository } from "./cart.repository";
import type { CartDto } from "src/dtos";

@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  createCart(userId: string) {
    return this.cartRepo.createCart(userId);
  }

  getCartById(id: string) {
    return this.cartRepo.findCartById(id);
  }

  maybeGetCartByUserId(userId: string): Promise<CartDto | null> {
    return this.cartRepo.findCartByUserId(userId);
  }

  insertCartItem(cartId: string, itemId: string) {
    return this.cartRepo.createCartItem(cartId, itemId);
  }

  getCartItemsByUserId(userId: string) {
    return this.cartRepo.findCartItemsByUserId(userId);
  }

  deleteCartItem(cartId: string, itemId: string) {
    return this.cartRepo.deleteCartItem(cartId, itemId);
  }
}
