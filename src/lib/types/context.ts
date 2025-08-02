import { StaticImageData } from "next/image";
import { Game } from "./data";

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
