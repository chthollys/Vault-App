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

export const EmailSchema = z.object({
  email: z.email({
    error: "Enter a valid email",
  }),
});

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(72, "Too long")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const OTPSchema = z.object({
  code: z.string().min(6, "OTP have invalid length"),
});

/**
 * @description User and Profile Schemas
 */

export const CreateUserSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .min(3, { error: "Username must include 3 or more character" })
    .optional()
    .nullable(),
  password: z.string().optional(),
});

export const CreateUserArraySchema = z.array(CreateUserSchema);

export const UserSchema = CreateUserSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  image: z.url(),
});

export const UserDtoSchema = CreateUserSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  image: z.url().nullable(),
  password: z.string().nullable(),
});

export const CreateProfileSchema = z.object({
  userId: z.cuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.url().optional(),
  country: z.string().optional(),
  dateOfBirth: z.date().optional(),
});

export const CreateProfileArraySchema = z.array(CreateProfileSchema);

export const ProfileSchema = CreateProfileSchema.extend({
  id: z.cuid(),
});

/**
 * @description Game Schemas
 */

const BaseGameSchema = z.object({
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

export const GameFormSchema = BaseGameSchema.extend({
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

export const CreateGameSchema = BaseGameSchema.extend({
  coverImageUrl: z.url(),
});

export const CreateGameArraySchema = z.array(CreateGameSchema);

export const GameSchema = CreateGameSchema.extend({
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

export const GenreFormSchema = baseGenreSchema.extend({
  parent: z.string().nullable(),
});

export const CreateGenreSchema = baseGenreSchema.extend({
  parentId: z.cuid().nullable(),
});

export const CreateGenreArraySchema = z.array(CreateGenreSchema);

export const GenreSchema = CreateGenreSchema.extend({
  id: z.cuid(),
});

export const CreateReviewSchema = z.object({
  rating: z.number(),
  comment: z.string().optional().nullable(),
  userId: z.cuid(),
  gameId: z.cuid(),
});

export const CreateReviewArraySchema = z.array(CreateReviewSchema);

export const ReviewSchema = CreateReviewSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
});
