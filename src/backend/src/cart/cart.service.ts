import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
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
    return this.cartRepo.findCartByUserId(userId);
  }

  getCartItemsByUserId(userId: string): Promise<CartItemDto[]> {
    return this.cartRepo.findCartItemsByUserId(userId);
  }

  async addCartItem(userId: string, gameId: string): Promise<CartItemDto> {
    const cartId = await this.cartRepo.findCartIdByUserId(userId);
    if (!cartId)
      throw new InternalServerErrorException("User has invalid cart");
    return this.cartRepo.createCartItem(cartId, gameId);
  }

  async removeCartItem(userId: string, itemId: string): Promise<CartItemDto> {
    const existingCartId = await this.cartRepo.findCartIdByUserId(userId);
    if (!existingCartId)
      throw new InternalServerErrorException("User has invalid cart");
    return this.cartRepo.deleteCartItem(itemId, existingCartId);
  }

  async toggleCartItem(itemId: string): Promise<CartItemDto> {
    const existingItems = await this.cartRepo.findCartItemById(itemId);
    if (!existingItems) {
      throw new BadRequestException("Item with given id not found");
    }
    return this.cartRepo.toggleCartItem(itemId, !existingItems.isChecked);
  }
}
