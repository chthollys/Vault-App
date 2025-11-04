import { Injectable } from "@nestjs/common";
import type { Cart, CartItem } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createCart(userId: string): Promise<Cart> {
    try {
      return await this.prisma.cart.create({
        data: { userId },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to create cart");
    }
  }

  async findCartById(id: string): Promise<Cart | null> {
    try {
      return await this.prisma.cart.findUnique({ where: { id } });
    } catch (err) {
      return this.errorHandler(err, "Failed to find cart");
    }
  }

  async findCartByUserId(userId: string): Promise<Cart | null> {
    try {
      return await this.prisma.cart.findFirst({
        where: { userId },
      });
    } catch (error) {
      return this.errorHandler(error, "Failed to find cart");
    }
  }

  async createCartItem(cartId: string, itemId: string): Promise<CartItem> {
    try {
      return await this.prisma.cartItem.create({
        data: { cartId, gameId: itemId },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to insert game into cart");
    }
  }

  async findCartItemsByUserId(userId: string): Promise<CartItem[]> {
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

  async deleteCartItem(cartId: string, itemId: string): Promise<CartItem> {
    try {
      return await this.prisma.cartItem.delete({
        where: { cartId_gameId: { cartId, gameId: itemId } },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to delete item");
    }
  }
}
