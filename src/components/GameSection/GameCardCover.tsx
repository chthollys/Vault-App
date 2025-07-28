import Image from "next/image";
import HeartButtonSVG from "@/UI/icons/HeartButtonSVG";
import classes from "./GameSection.module.css";
import { useContext } from "react";
import { GameCardContext } from "./GameCard";
import { hasCompleteValue } from "@/lib/utils/utils";

export default function GameCardCover() {
  const { game, defaultImg, isInWishlist } = useContext(GameCardContext);
  if (!game || !hasCompleteValue(game)) {
    return <p>Game object data is incomplete</p>;
  }
  return (
    <div className={classes["game-cover-container"]}>
      <Image
        className={classes["game-cover"]}
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
    </div>
  );
}
