import { z } from "zod";
import {
  GameFormSchema,
  CreateGameSchema,
  GameSchema,
  GenreFormSchema,
  CreateGenreSchema,
  GenreSchema,
  CreateReviewSchema,
  ReviewSchema,
  CreateUserSchema,
  CreateProfileSchema,
  UserSchema,
} from "@repo/types/src/schemas";

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserSchema>;

export type CreateProfileData = z.infer<typeof CreateProfileSchema>;
export type Profile = z.infer<typeof CreateProfileSchema>;

export type GameFormData = z.infer<typeof GameFormSchema>;
export type CreateGameData = z.infer<typeof CreateGameSchema>;
export type Game = z.infer<typeof GameSchema>;
export type GamesInfinite = {
  games: Game[];
  hasMore: boolean;
};

export type GenreFormData = z.infer<typeof GenreFormSchema>;
export type CreateGenreData = z.infer<typeof CreateGenreSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type ParentChildrenGenre = Genre & { subGenres: Genre[] };

export type CreateReviewData = z.infer<typeof CreateReviewSchema>;
export type Review = z.infer<typeof ReviewSchema>;

export type SortingRules = {
  categories?: string[] | null;
  sortBy?: string[] | null;
};

export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };
