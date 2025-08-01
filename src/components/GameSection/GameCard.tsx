import Link from "next/link";
import { GameItemProps, GameCardContextObj } from "@/lib/definitions";
import { createContext, useContext } from "react";
import GameCardWrapper from "../Wrapper/GameCardWrapper";
import GameCardCover from "./GameCardCover";
import defaultImage from "~/assets/images/gameDefault.png";
import GameCardInfo from "./GameCardInfo";

export const GameCardContext = createContext<GameCardContextObj>({
  game: null,
  defaultImg: "",
  isInWishlist: false,
  isInCart: false,
});

export const useGameCardContext = () => {
  const ctxData = useContext(GameCardContext);
  if (!ctxData) {
    console.error(
      "Use this component children component inside its parent component (GameCard)"
    );
  }
  return ctxData;
};

export default function GameCard({ game }: GameItemProps) {
  const ctxValue: GameCardContextObj = {
    game,
    defaultImg: defaultImage,
    isInWishlist: false,
    isInCart: false,
  };

  return (
    <GameCardContext.Provider value={ctxValue}>
      <Link href={`/game/${game.id}`}>
        <GameCardWrapper
          role="listitem"
          tabIndex={0}
          className="group/game-card"
        >
          <GameCardCover />
          <GameCardInfo />
        </GameCardWrapper>
      </Link>
    </GameCardContext.Provider>
  );
}
