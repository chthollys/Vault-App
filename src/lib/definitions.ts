import { z } from "zod";
import { StaticImageData } from "next/image";
import React from "react";

/**
 * @description template types for handling action and result
 */

export type Result<T> = {
  success: true;
  data: T;
};

export type Error<E = string> = {
  success: false;
  error: E;
};

export type Action<T, E = string> = Promise<Result<T> | Error<E>>;

export type Query<T, E = string> = Promise<Result<T> | Error<E>>;

/**
 * @description image rule and format types supported
 */

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * @description zod schemas definition
 */

export const staticImageDataSchema = z.object({
  src: z.string(),
  height: z.number(),
  width: z.number(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurheight: z.number().optional(),
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
  parent: z.string().optional(),
});

export const createGenreSchema = baseGenreSchema.extend({
  parentId: z.cuid().optional(),
});

export const createGenreArraySchema = z.array(createGenreSchema);

export const genreSchema = createGenreSchema.extend({
  id: z.cuid(),
});

/**
 * @description objects and types definition
 */

export type GameFormData = z.infer<typeof gameFormSchema>;
export type CreateGameData = z.infer<typeof createGameSchema>;
export type Game = z.infer<typeof gameSchema>;

export type GenreFormData = z.infer<typeof genreFormSchema>;
export type CreateGenreData = z.infer<typeof createGenreSchema>;
export type Genre = z.infer<typeof genreSchema>;

/**
 * @description context definitions
 */

export interface GameSectionContextObj {
  title: string;
  label: string;
  href: string;
  games: Game[];
}

export interface GameCardContextObj {
  game: Game | null;
  defaultImg: string | StaticImageData;
  isInWishlist: boolean;
  isInCart: boolean;
}

/**
 * @description util helper types
 */

export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };

/**
 * @description -- definition for functional component used in the app
 */

export interface ChildrenProp {
  children?: React.ReactNode;
}

export type DivElementProps = React.ComponentPropsWithoutRef<"div">;
export type ButtonElementProps = React.ComponentPropsWithoutRef<"button">;
export type ParagraphElementProps = React.ComponentPropsWithoutRef<"p">;
export type SpanElementProps = React.ComponentPropsWithoutRef<"span">;
export type AnchorElementProps = React.ComponentPropsWithoutRef<"a">;

export interface ErrorCaughtProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface LinkSectionProps extends ChildrenProp {
  label: string | undefined;
  labelClass?: string | undefined;
  sectionClass?: React.ComponentPropsWithoutRef<"div">["className"];
}

export interface LinkListProps extends ChildrenProp {
  className?: React.ComponentPropsWithoutRef<"ul">["className"];
}

export interface LinkItemProps extends AnchorElementProps {
  listClass?: string | undefined;
  href: string;
}

export interface GameSectionProps extends ChildrenProp {
  title: string;
  label?: string | undefined;
  href: string;
  games: Game[];
}

export interface GameItemProps {
  game: Game;
}

export interface HeartButtonSVGProps {
  id: string | number;
  active?: boolean;
  onClick: () => void;
}
