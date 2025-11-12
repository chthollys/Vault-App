import { BadRequestException, Injectable } from "@nestjs/common";
import { CartRepository } from "./cart.repository";
import type { CartDto } from "src/dtos";
import { CartItemDto } from "src/dtos/cart-item.dto";

@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  createCart(userId: string): Promise<CartDto> {
    return this.cartRepo.createCart(userId);
  }

  async maybeGetCartByUserId(userId: string): Promise<CartDto | null> {
    if (!userId) return null;
    return this.cartRepo.findCartByUserId(userId);
  }

  getCartItemsByUserId(userId: string): Promise<CartItemDto[]> {
    return this.cartRepo.findCartItemsByUserId(userId);
  }

  async addCartItem(
    userId: string,
    gameId: string,
  ): Promise<CartItemDto | null> {
    if (!userId) return null;
    const cartId = await this.cartRepo.findCartIdByUserId(userId);
    return this.cartRepo.createCartItem(cartId, gameId);
  }

  removeCartItem(itemId: string): Promise<CartItemDto> {
    return this.cartRepo.deleteCartItem(itemId);
  }

  async toggleCartItem(itemId: string): Promise<CartItemDto> {
    const existingItems = await this.cartRepo.findCartItemById(itemId);
    if (!existingItems) {
      throw new BadRequestException("Item with given id not found");
    }
    return this.cartRepo.toggleCartItem(itemId, !existingItems.isChecked);
  }
}
