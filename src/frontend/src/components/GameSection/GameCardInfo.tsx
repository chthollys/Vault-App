import GameCardInfoWrapper from "@/components/Wrapper/GameCardInfoWrapper";
import { GameTitle, GameDeveloper } from "@/components/Typography";
import GameCardRating from "./GameCardRating";
import type { GameCardInfoProps } from "@/lib/types/props";
import PriceSection from "./PriceSection";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function GameCardInfo({
  game,
  isInCart,
  onToggle,
}: GameCardInfoProps) {
  const handleToggleGame = () => {
    onToggle(game.id);
  };

  return (
    <GameCardInfoWrapper>
      <PriceSection price={game.price} afterPrice={game.discountedPrice} />
      <Link href={`/game/${game.id}`} className="hover:underline">
        <GameTitle className="mt-4">{game?.title}</GameTitle>
      </Link>
      <GameDeveloper className="mb-3">{game?.developer}</GameDeveloper>
      <GameCardRating rating={game?.rating} />

      {/** Clean separation for keeping the above server comp */}
      {isInCart ? (
        <Button
          className="mt-4 h-12 bg-gray-600 text-[0.9rem]"
          onPress={handleToggleGame}
        >
          Remove from cart
        </Button>
      ) : (
        <Button
          className="mt-4 h-12"
          color="primary"
          onPress={handleToggleGame}
        >
          Add to Cart
        </Button>
      )}
    </GameCardInfoWrapper>
  );
}
