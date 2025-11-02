import { Injectable } from "@nestjs/common";
import { CartRepository } from "./cart.repository";

@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  getCartByUserId(userId: string) {
    return this.cartRepo.findCartByUserId(userId);
  }
}
