import React from "react";
import type {
  CartItem,
  CartWithItems,
  UserSession,
  Game,
  ParentChildrenGenre,
  User,
} from "@repo/types";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from "react";
import type { StaticImageData } from "next/image";
import type { InputProps } from "@heroui/react";
import type { GamesQuery } from "@repo/types";
import type { Genre } from "@repo/types";
import { UserSignupStep } from "./auth";

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
export type InputElementProps = React.ComponentPropsWithoutRef<"input">;
export type CSSClassName = Pick<DivElementProps, "className">;

export interface AuthFormInputProps extends InputProps {
  name: string;
  label?: string;
  id?: string;
  errorMessages?: string[];
  ref?: Ref<HTMLInputElement>;
}
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

export interface FooterLinkSectionProps extends DivElementProps {
  label?: string;
}

export interface FooterLinkProps extends ChildrenProp {
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
  sortRule?: GamesQuery;
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
  isInCart?: boolean;
  isInWishlist?: boolean;
  onToggleCartItem: (id: string) => void;
  onToggleWishList: (id: string) => void;
}

export interface GameCardCoverProps {
  game: Game;
  isInWishlist: boolean;
  onToggleWishList: (id: string) => void;
}

export interface GameCardInfoProps {
  game: Game;
  isInCart: boolean;
  onToggle: (id: string) => void;
}

export interface GameInfoDetailProps {
  name: string;
  genres: Genre[];
  developer: string;
  publisher?: string;
}

export interface GameInfoLeftSection {
  game: Game;
}

export interface DescriptionSectionProps {
  title: string;
  description: string;
}

export interface PriceSectionProps {
  price: number;
  afterPrice?: number | null;
}

export interface HeartButtonSVGProps extends ButtonElementProps {
  isActive?: boolean;
  onClick: () => void;
}

export interface UserAvatarIconProps {
  imageUrl?: string | null;
  onClick?: () => void;
}

export interface UserActionModalProps {
  name?: string | null;
  email?: string | null;
  iconUrl?: string | null;
}

export interface UserActionModalWrapperProps extends ChildrenProp {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface SignupFlowProps {
  initialStep: UserSignupStep;
}

export interface SignupFormProps {
  onRefresh: () => Promise<void>;
}

export interface BadgedIconProps {
  icon: ReactNode;
  isInvisible?: boolean;
}

export interface BreadcrumbsNavProps {
  currentLabel?: string;
}

export interface DeleteCartItemButtonProps extends ChildrenProp {
  onClick?: () => void;
}

export interface DetailPriceSectionProps {
  price: number;
  discountedPrice?: number | null;
}

export interface CartContainerProps {
  cart: CartWithItems;
}
export interface CartItemProps {
  cartItem: CartItem;
}
