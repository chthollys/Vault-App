import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { CartModule } from "src/cart/cart.module";

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [CartModule],
})
export class UsersModule {}
