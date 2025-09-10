import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import type { GamesQuery, SortBy } from "repo/types";

export class GamesQueryDto implements GamesQuery {
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : value,
  )
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : value,
  )
  @IsArray()
  @IsString({ each: true })
  sortBy?: SortBy[] | null;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  page?: number;
}
