import React from "react";
import { Game, ParentChildrenGenre } from "./data";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { StaticImageData } from "next/image";
import type { SortingRules } from "./utils";

export interface ChildrenProp {
  children?: React.ReactNode;
}

export type WrapperProps<T extends ElementType> = React.PropsWithChildren<{
  /**
   * The component or HTML tag to render.
   * @default 'div'
   */
  as?: T;
  nextClass?: string | undefined;
}> &
  Omit<ComponentPropsWithoutRef<T>, "as">;

export type DivElementProps = React.ComponentPropsWithoutRef<"div">;
export type ButtonElementProps = React.ComponentPropsWithoutRef<"button">;
export type ParagraphElementProps = React.ComponentPropsWithoutRef<"p">;
export type SpanElementProps = React.ComponentPropsWithoutRef<"span">;
export type AnchorElementProps = React.ComponentPropsWithoutRef<"a">;
export type ImageElementProps = React.ComponentPropsWithoutRef<"img">;

export interface HydrationProps extends ChildrenProp {
  searchParams?: URLSearchParams;
}
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

export interface AsideCheckboxProps {
  id?: string;
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export interface GenreNavProps {
  genres: ParentChildrenGenre[];
}

export interface GenresCheckboxProps {
  genres: ParentChildrenGenre[];
}

export interface ImageCarouselItemProps extends ChildrenProp {
  image: StaticImageData | string;
  href: string;
}

export interface FeaturedGamesProps {
  games: Game[];
}

export interface GamesGridContainerProps {
  sortRule?: SortingRules;
  title?: string;
}

export interface GameGridsSectionProps {
  hotGames: Game[];
  recommendedGames: Game[];
}

export interface GameSectionProps extends ChildrenProp {
  title: string;
  label?: string | undefined;
  href: string;
  games: Game[];
}

export interface GameSectionHeaderProps {
  title: string;
  label: string;
  href: string;
}

export interface GamesGridProps {
  title?: string;
  games: Game[];
}

export interface GameCardProps {
  game: Game;
}

export interface GameCardCoverProps {
  game: Game;
  isInWishlist: boolean;
}

export interface GameCardInfoProps {
  game: Game;
  isInCart: boolean;
}

export interface PriceSectionProps {
  price: number;
  afterPrice?: number | null;
}

export interface HeartButtonSVGProps extends ButtonElementProps {
  isActive?: boolean;
  onClick: () => void;
}

export interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}
