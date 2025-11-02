import type { Genre, ParentChildrenGenre } from "@repo/types";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

export class GenreDto implements Genre {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  parentId: string | null;
}

export class NestedGenreDto implements ParentChildrenGenre {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  parentId: string | null;

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => GenreDto)
  subGenres: GenreDto[];
}
