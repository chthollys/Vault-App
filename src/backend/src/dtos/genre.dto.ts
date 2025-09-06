import { Expose } from "class-transformer";
import type { Genre } from "repo";

export class GenreDto implements Genre {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  parentId: string | null;
}
