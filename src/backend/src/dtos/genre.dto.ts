import { Expose } from "class-transformer";
import type { Genre, ParentChildrenGenre } from "@repo/types";

export class GenreDto implements Genre {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  parentId: string | null;
}

export class NestedGenreDto implements ParentChildrenGenre {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  parentId: string | null;

  @Expose()
  subGenres: GenreDto[];
}
