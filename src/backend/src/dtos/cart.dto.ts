import type { CartWithItems } from "@repo/types";
import { IsArray, IsDate, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { CartItemDto } from "./cart-item.dto";

export class CartDto implements CartWithItems {
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
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
