import Link from "next/link";
import type { GameCardProps } from "@/lib/types/props";
import { GameCardWrapper } from "../Wrapper";
import GameCardCover from "./GameCardCover";
import GameCardInfo from "./GameCardInfo";

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`}>
      <GameCardWrapper
        role="listitem"
        tabIndex={0}
        className="group/game-card hover:bg-glass-hover transition-(--transition-normal) hover:-translate-y-2 hover:border-black/15 hover:shadow-[0_20px_60px_rgba(0,_0,_0,_0.4)]"
      >
        <GameCardCover game={game} isInWishlist={false} />
        <GameCardInfo game={game} isInCart={false} />
      </GameCardWrapper>
    </Link>
  );
}
