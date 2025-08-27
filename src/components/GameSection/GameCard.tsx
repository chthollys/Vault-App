import Link from "next/link";
import type { GameCardProps } from "@/lib/types/props";
import { GameCardWrapperWithHover as GameCardWrapper } from "../Wrapper";
import GameCardCover from "./GameCardCover";
import GameCardInfo from "./GameCardInfo";

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`}>
      <GameCardWrapper role="listitem" tabIndex={0}>
        <GameCardCover game={game} isInWishlist={false} />
        <GameCardInfo game={game} isInCart={false} />
      </GameCardWrapper>
    </Link>
  );
}
