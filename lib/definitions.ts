import { z } from "zod";
import { StaticImageData } from "next/image";
import React, { ComponentPropsWithoutRef } from "react";

/**
 * @description zod schemas definition
 */

export const StaticImageDataSchema = z.object({
  src: z.string(),
  height: z.number(),
  width: z.number(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurheight: z.number().optional(),
});

export const GameSchema = z.object({
  id: z.union([z.string(), z.number()], { error: "Invalid Id" }),
  title: z.string({ error: "Invalid game title" }),
  image: z.union([z.string(), StaticImageDataSchema], {
    error: "Invalid image",
  }),
  developer: z.string({ error: "Invalid developer" }),
  price: z.number({ error: "Invalid price" }),
  rating: z.number({ error: "Invalid rating value" }),
});

/**
 * @description -- definition for functional component used in the app
 */

export interface ChildrenProp {
  children?: React.ReactNode;
}

export interface LinkSectionProps extends ChildrenProp {
  label: string | undefined;
  labelClass?: string | undefined;
  sectionClass?: ComponentPropsWithoutRef<"div">["className"];
}

export interface LinkListProps extends ChildrenProp {
  className?: ComponentPropsWithoutRef<"ul">["className"];
}

export interface LinkItemProps extends ChildrenProp {
  href: string;
}

export interface GameSectionProps extends ChildrenProp {
  title: string;
  label?: string | undefined;
  href: string;
}

export interface GameItemProps {
  game: Game;
}

export interface HeartButtonSVGProps {
  id: string | number;
  active?: boolean;
  onClick: () => void;
}

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
 * @description objects definition
 */

export type Game = z.infer<typeof GameSchema>;

/**
 * @description util helper types
 */

export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };
