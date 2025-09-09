import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import type { GamesQuery, SortBy } from "repo/types";

export class GamesQueryDto implements GamesQuery {
  @IsOptional()
  category?: string[] | null | undefined;

  @IsOptional()
  sortBy?: SortBy[] | null | undefined;

  @IsOptional()
  @Type(() => Number)
  limit?: number | undefined;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number | undefined;
}
