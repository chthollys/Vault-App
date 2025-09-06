import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import type { GamesQuery, SortBy } from "repo/types";

export class GameQueryDto implements GamesQuery {
  @IsOptional()
  categories?: string[] | null | undefined;

  @IsOptional()
  sortBy?: SortBy[] | null | undefined;

  @IsOptional()
  @Type(() => Number)
  limit?: number | null | undefined;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number | null | undefined;
}
