"use client";

import Image from "next/image";
import HeartButtonSVG from "@/UI/icons/HeartButtonSVG";
import { useGameCardContext } from "./GameCard";
import { hasCompleteValue } from "@/lib/utils/utils";
import GameCoverWrapper from "../Wrapper/GameCoverWrapper";

export default function GameCardCover() {
  const { game, defaultImg, isInWishlist } = useGameCardContext();
  if (!game || !hasCompleteValue(game)) {
    return <p>Game object data is incomplete</p>;
  }
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
        id={game.id!}
        active={isInWishlist || false}
        onClick={() => console.log("Item triggered wih an id of ", game.id!)}
      />
    </GameCoverWrapper>
  );
}
