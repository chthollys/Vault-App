import { z } from "zod";
import {
  gameFormSchema,
  createGameSchema,
  gameSchema,
  genreFormSchema,
  createGenreSchema,
  genreSchema,
  createReviewSchema,
  reviewSchema,
  createUserSchema,
  createProfileSchema,
  userSchema,
} from "../schemas";

export type CreateUserData = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof userSchema>;

export type CreateProfileData = z.infer<typeof createProfileSchema>;
export type Profile = z.infer<typeof createProfileSchema>;

export type GameFormData = z.infer<typeof gameFormSchema>;
export type CreateGameData = z.infer<typeof createGameSchema>;
export type Game = z.infer<typeof gameSchema>;

export type GenreFormData = z.infer<typeof genreFormSchema>;
export type CreateGenreData = z.infer<typeof createGenreSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type ParentChildrenGenre = Genre & { subGenres: Genre[] };

export type CreateReviewData = z.infer<typeof createReviewSchema>;
export type Review = z.infer<typeof reviewSchema>;
