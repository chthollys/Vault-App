import Link from "next/link";
import type { GameCardProps } from "@/lib/types/props";
import { GameCardWrapperWithHover as GameCardWrapper } from "../Wrapper";
import GameCardCover from "./GameCardCover";
import GameCardInfo from "./GameCardInfo";

export default function GameCard({
  game,
  isInWishlist = false,
  isInCart = false,
  isPending,
  onToggleCartItem,
  onToggleWishList,
}: GameCardProps) {
  return (
    <GameCardWrapper role="listitem" tabIndex={0}>
      <Link href={`/game/${game.id}`}>
        <GameCardCover
          game={game}
          isInWishlist={isInWishlist}
          onToggleWishList={onToggleWishList}
        />
      </Link>
      <GameCardInfo
        game={game}
        isInCart={isInCart}
        onToggle={onToggleCartItem}
        isPending={isPending}
      />
    </GameCardWrapper>
  );
}
