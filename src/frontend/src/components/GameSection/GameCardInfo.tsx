import GameCardInfoWrapper from "@/components/Wrapper/GameCardInfoWrapper";
import { GameTitle, GameDeveloper } from "@/components/Typography";
import GameCardRating from "./GameCardRating";
import type { GameCardInfoProps } from "@/lib/types/props";
import PriceSection from "./PriceSection";
import { Button } from "@heroui/react";
import Link from "next/link";
import cn from "@/lib/utils/cn";

export default function GameCardInfo({
  game,
  isInCart,
  isPending,
  onToggle,
}: GameCardInfoProps) {
  const handleToggleGame = () => {
    onToggle(game.id);
  };

  const classNames = cn(["mt-4 h-12", isInCart && "bg-gray-600 text-[0.9rem]"]);

  return (
    <GameCardInfoWrapper>
      <PriceSection price={game.price} afterPrice={game.discountedPrice} />
      <Link href={`/game/${game.id}`} className="hover:underline">
        <GameTitle className="mt-4 overflow-hidden text-nowrap">
          {game?.title}
        </GameTitle>
      </Link>
      <>
        <GameDeveloper className="mt-3">{game?.developer}</GameDeveloper>
        <GameCardRating rating={game?.rating} />
      </>

      <Button
        className={classNames}
        onPress={handleToggleGame}
        isDisabled={isPending}
        isLoading={isPending}
        color={isInCart ? "default" : "primary"}
      >
        {isPending ? "" : isInCart ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </GameCardInfoWrapper>
  );
}
