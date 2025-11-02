import { Expose } from "class-transformer";
import type { Game } from "@repo/types";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class GameDto implements Game {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  price: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  discountedPrice?: number | null | undefined;

  @Expose()
  @IsNumber()
  rating: number;

  @Expose()
  @IsDate()
  releaseDate: Date;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsString()
  publisher: string;

  @Expose()
  @IsString()
  developer: string;

  @Expose()
  @IsString()
  coverImageUrl: string;
}
