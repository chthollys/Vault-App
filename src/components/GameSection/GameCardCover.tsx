import Image from "@/components/ImageOptimized";
import { HeartButtonSVG } from "@/UI/icons";
import { GameCardWrapperWithHover as GameCoverWrapper } from "../Wrapper";
import defaultImg from "~/assets/images/gameDefault.png";
import type { GameCardCoverProps } from "@/lib/types/props";

export default function GameCardCover({
  game,
  isInWishlist,
}: GameCardCoverProps) {
  return (
    <GameCoverWrapper>
      <Image
        src={game.coverImageUrl || defaultImg}
        alt={"GAME ALT"}
        className="h-full w-full object-cover transition-(--transition-normal) group-hover/game-card:scale-105"
        priority
      />
      <HeartButtonSVG
        isActive={isInWishlist || false}
        onClick={() => console.log("Item triggered wih an id of ", game.id)}
        className="absolute top-4 right-4 hover:scale-110 hover:bg-black/90"
      />
    </GameCoverWrapper>
  );
}
