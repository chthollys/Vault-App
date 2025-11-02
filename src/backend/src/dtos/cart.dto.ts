import type { Cart, CartItem } from "@repo/types";
import { IsArray, IsDate, IsString, ValidateNested } from "class-validator";
import { Expose } from "class-transformer";

export class CartDto implements Cart {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  userId: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  items: CartItem[];
}
