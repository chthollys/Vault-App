import Image from "next/image";
import HeartButtonSVG from "@/UI/icons/HeartButtonSVG";
import GameCoverWrapper from "../Wrapper/GameCoverWrapper";
import defaultImg from "~/assets/images/gameDefault.png";
import { GameCardCoverProps } from "@/lib/types/props";

export default function GameCardCover({
  game,
  isInWishlist,
}: GameCardCoverProps) {
  return (
    <GameCoverWrapper>
      <Image
        className="h-full w-full object-cover transition-(--transition-normal) group-hover/game-card:scale-105"
        src={game.coverImageUrl || defaultImg}
        alt={"GAME ALT"}
        fill
        loading="lazy"
      />
      <HeartButtonSVG
        isActive={isInWishlist || false}
        onClick={() => console.log("Item triggered wih an id of ", game.id)}
        className="absolute top-4 right-4 hover:scale-110 hover:bg-black/90"
      />
    </GameCoverWrapper>
  );
}
