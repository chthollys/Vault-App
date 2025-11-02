import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";

@Module({
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
