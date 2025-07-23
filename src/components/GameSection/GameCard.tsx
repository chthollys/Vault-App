import Link from "next/link";
import classes from "./GameSection.module.css";
import { GameItemProps, GameCardContextObj } from "~/lib/definitions";
import { createContext } from "react";
import GameCardCover from "./GameCardCover";
import defaultImage from "~/assets/images/gameDefault.png";
import GameCardInfo from "./GameCardInfo";

export const GameCardContext = createContext<GameCardContextObj>({
  game: null,
  defaultImg: "",
  isInWishlist: false,
  isInCart: false,
});

export default function GameCard({ game }: GameItemProps) {
  const ctxValue: GameCardContextObj = {
    game,
    defaultImg: defaultImage,
    isInWishlist: false,
    isInCart: false,
  };

  return (
    <GameCardContext.Provider value={ctxValue}>
      <Link href={"PRODUCT-DETAIL"}>
        <article className={classes["game-card"]} role="listitem" tabIndex={0}>
          <GameCardCover />
          <GameCardInfo />
        </article>
      </Link>
    </GameCardContext.Provider>
  );
}
