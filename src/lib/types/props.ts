import React from "react";
import { Game } from "./data";

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
