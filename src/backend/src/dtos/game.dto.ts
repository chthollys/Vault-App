import { Expose } from "class-transformer";
import type { Game } from "repo/types";

export class GameDto implements Game {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  discountedPrice?: number | null | undefined;

  @Expose()
  rating: number;

  @Expose()
  releaseDate: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  publisher: string;

  @Expose()
  developer: string;

  @Expose()
  coverImageUrl: string;
}
