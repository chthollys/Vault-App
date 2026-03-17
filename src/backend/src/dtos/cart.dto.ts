import type { CartWithItems } from "@repo/types";
import { IsArray, IsDate, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { CartItemDto } from "./cart-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CartDto implements CartWithItems {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ type: () => CartItemDto, isArray: true })
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
