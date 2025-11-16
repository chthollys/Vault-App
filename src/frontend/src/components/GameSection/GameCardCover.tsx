import Image from "@/components/ImageOptimized";
import { HeartButtonSVG } from "@/UI/icons";
import { GameCoverWrapper } from "../Wrapper";
import defaultImg from "~/assets/images/gameDefault.png";
import type { GameCardCoverProps } from "@/lib/types/props";
import type { MouseEvent } from "react";

export default function GameCardCover({
  game,
  isInWishlist,
  onToggleWishList,
}: GameCardCoverProps) {
  const handleToggleWishList = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleWishList(game.id);
  };
  return (
    <GameCoverWrapper>
      <Image
        src={game.coverImageUrl || defaultImg}
        alt={"GAME ALT"}
        className="h-full w-full object-cover transition-(--transition-normal) group-hover/game-card:scale-105"
        loading="eager"
      />
      <HeartButtonSVG
        isActive={isInWishlist || false}
        onClick={handleToggleWishList}
        className="absolute top-4 right-4 hover:scale-110 hover:bg-black/90"
      />
    </GameCoverWrapper>
  );
}
