import { Injectable } from "@nestjs/common";
import type { Cart, CartItem, Game } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

type CartItemWithGame = CartItem & {
  game: Game;
};

type CartFullObj = Cart & { items: CartItemWithGame[] };

const includeGameItem = {
  items: { include: { game: true } },
};

@Injectable()
export class CartRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createCart(userId: string): Promise<CartFullObj> {
    try {
      return await this.prisma.cart.create({
        data: { userId },
        include: includeGameItem,
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to create cart");
    }
  }

  async findCartByUserId(userId: string): Promise<CartFullObj | null> {
    try {
      return await this.prisma.cart.findUnique({
        where: { userId },
        include: includeGameItem,
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to find cart");
    }
  }

  async findCartIdByUserId(userId: string): Promise<string> {
    try {
      let cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: includeGameItem,
      });
      if (!cart) {
        throw new Error("Cart is not found");
      }
      return cart.id;
    } catch (error) {
      return this.errorHandler(error, "Failed to find cart");
    }
  }

  async createCartItem(
    cartId: string,
    gameId: string,
  ): Promise<CartItemWithGame> {
    try {
      return await this.prisma.cartItem.create({
        data: { cartId, gameId },
        include: { game: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to insert game into cart");
    }
  }

  async findCartItemsByUserId(userId: string): Promise<CartItemWithGame[]> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: includeGameItem,
      });
      return cart?.items ?? [];
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch games in cart");
    }
  }

  async deleteCartItem(itemId: string): Promise<CartItemWithGame> {
    try {
      return await this.prisma.cartItem.delete({
        where: { id: itemId },
        include: { game: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to delete game in cart");
    }
  }
}
