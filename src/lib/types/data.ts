import { z } from "zod";
import {
  gameFormSchema,
  createGameSchema,
  gameSchema,
  genreFormSchema,
  createGenreSchema,
  genreSchema,
} from "../schemas";

export type GameFormData = z.infer<typeof gameFormSchema>;
export type CreateGameData = z.infer<typeof createGameSchema>;
export type Game = z.infer<typeof gameSchema>;

export type GenreFormData = z.infer<typeof genreFormSchema>;
export type CreateGenreData = z.infer<typeof createGenreSchema>;
export type Genre = z.infer<typeof genreSchema>;
