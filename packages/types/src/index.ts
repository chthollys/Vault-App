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
  UserDtoSchema,
} from "./schemas";

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserDto = z.infer<typeof UserDtoSchema>;

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

export type SortBy = "newest" | "popular" | "highest-price" | "lowest-price";
export type OrderBy = "asc" | "desc";
export type GamesQuery = {
  categories?: string[] | null;
  sortBy?: SortBy[] | null;
  limit?: number;
  page?: number;
};

export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };

export type ApiMessageResponse = {
  success: boolean;
  message?: string;
};

export type ApiDataResponse<T> = ApiMessageResponse & { data: T };
