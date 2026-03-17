import type { Genre, ParentChildrenGenre } from "@repo/types";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GenreDto implements Genre {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsOptional()
  @IsString()
  parentId: string | null;
}

export class NestedGenreDto implements ParentChildrenGenre {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  @Expose()
  @IsOptional()
  @IsString()
  parentId: string | null;

  @ApiProperty({ type: () => GenreDto, isArray: true })
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => GenreDto)
  subGenres: GenreDto[];
}
