import { Expose } from "class-transformer";
import type { Game } from "@repo/types";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GameDto implements Game {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({ type: Number })
  @Expose()
  @IsString()
  price: number;

  @ApiPropertyOptional({ type: Number, nullable: true })
  @Expose()
  @IsOptional()
  @IsNumber()
  discountedPrice?: number | null | undefined;

  @ApiProperty({ type: Number })
  @Expose()
  @IsNumber()
  rating: number;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  releaseDate: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Expose()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  publisher: string;

  @ApiProperty()
  @Expose()
  @IsString()
  developer: string;

  @ApiProperty()
  @Expose()
  @IsString()
  coverImageUrl: string;
}
