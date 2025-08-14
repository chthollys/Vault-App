import { z } from "zod";

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const staticImageDataSchema = z.object({
  src: z.string(),
  height: z.number(),
  width: z.number(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurheight: z.number().optional(),
});

/**
 * @description User and Profile Schemas
 */

export const createUserSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(3, { error: "Username must include 3 or more character" }),
  password: z.string(),
});

export const createUserArraySchema = z.array(createUserSchema);

export const userSchema = createUserSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProfileSchema = z.object({
  userId: z.cuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.url().optional(),
  country: z.string().optional(),
  dateOfBirth: z.date().optional(),
});

export const createProfileArraySchema = z.array(createProfileSchema);

export const profileSchema = createProfileSchema.extend({
  id: z.cuid(),
});

/**
 * @description Game Schemas
 */

const baseGameSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, { error: "Title can't be empty" }),
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 character long"),
  price: z.number({ error: "Invalid price" }),
  discountedPrice: z.number().nullable().optional(),
  releaseDate: z.coerce.date({ error: "Valid release date is required" }),
  developer: z.string().min(1, "Developer name is required"),
  publisher: z.string().min(1, "Publisher name is required"),
});

export const gameFormSchema = baseGameSchema.extend({
  coverImage: z.union([
    z.url({ error: "Please provide a valid url" }),
    z
      .file()
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        error: "Max file size is 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        error: "Only *.jpeg, *.jpg, *.png, *.webp formats is supportted.",
      }),
  ]),
});

export const createGameSchema = baseGameSchema.extend({
  coverImageUrl: z.url(),
});

export const createGameArraySchema = z.array(createGameSchema);

export const gameSchema = createGameSchema.extend({
  id: z.cuid(),
  rating: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * @description Genre Schemas
 */

const baseGenreSchema = z.object({
  name: z.string().min(1, "Genre name is required"),
});

export const genreFormSchema = baseGenreSchema.extend({
  parent: z.string().nullable(),
});

export const createGenreSchema = baseGenreSchema.extend({
  parentId: z.cuid().nullable(),
});

export const createGenreArraySchema = z.array(createGenreSchema);

export const genreSchema = createGenreSchema.extend({
  id: z.cuid(),
});

export const createReviewSchema = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  userId: z.cuid(),
  gameId: z.cuid(),
});

export const createReviewArraySchema = z.array(createReviewSchema);

export const reviewSchema = createReviewSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
});
