import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import type { GamesQuery, SortBy } from "@repo/types";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GamesFilterDto implements GamesQuery {
  @ApiPropertyOptional({
    type: [String],
    description: "Comma-separated categories, e.g. action,rpg",
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : value,
  )
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiPropertyOptional({
    type: [String],
    enum: ["newest", "popular", "highest-price", "lowest-price"],
    description: "Comma-separated sorting rules",
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : value,
  )
  @IsArray()
  @IsString({ each: true })
  sortBy?: SortBy[] | null;

  @ApiPropertyOptional({ type: Number, default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
