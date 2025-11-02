import { Injectable } from "@nestjs/common";
import type { CartItem } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createCart(userId: string): Promise<boolean> {
    try {
      await this.prisma.cart.create({ data: { userId } });
      return true;
    } catch (err) {
      return false;
    }
  }

  async findCartByUserId(userId: string): Promise<CartItem[]> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        select: { items: true },
      });
      return cart?.items ?? [];
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch games in cart");
    }
  }

  async findCartItem(cartId: string, gameId: string): Promise<CartItem | null> {
    try {
      return await this.prisma.cartItem.findUnique({
        where: { cartId_gameId: { cartId, gameId } },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to find game in cart");
    }
  }

  async createCartItem(cartId: string, gameId: string): Promise<CartItem> {
    try {
      return await this.prisma.cartItem.create({ data: { cartId, gameId } });
    } catch (err) {
      return this.errorHandler(err, "Failed to insert game into cart");
    }
  }

  async deleteCartItem(cartId: string, gameId: string): Promise<CartItem> {
    try {
      return await this.prisma.cartItem.delete({
        where: { cartId_gameId: { cartId, gameId } },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to delete item");
    }
  }
}
