import { Injectable } from "@nestjs/common";
import type { Cart, CartItem, Game } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

type CartItemFullObj = CartItem & {
  game: Pick<Game, "id" | "price">;
};

type CartFullObj = Cart & { items: CartItemFullObj[] };

const includeGameItem = {
  items: { include: { game: { select: { price: true, id: true } } } },
};

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

  async findCartById(id: string): Promise<CartFullObj | null> {
    try {
      return await this.prisma.cart.findUnique({
        where: { id },
        include: includeGameItem,
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to find cart");
    }
  }

  async findCartByUserId(userId: string): Promise<CartFullObj | null> {
    try {
      return await this.prisma.cart.findUnique({
        where: { userId },
        include: includeGameItem,
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

  async findCartItemsByUserId(userId: string): Promise<CartItemFullObj[]> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        select: {
          items: { include: { game: { select: { price: true, id: true } } } },
        },
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
