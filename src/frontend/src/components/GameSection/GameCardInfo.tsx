import GameCardInfoWrapper from "@/components/Wrapper/GameCardInfoWrapper";
import { GameTitle, GameDeveloper } from "@/components/Typography";
import GameCardRating from "./GameCardRating";
import { PurpleButton } from "@/UI/buttons";
import type { GameCardInfoProps } from "@/lib/types/props";
import PriceSection from "./PriceSection";

export default function GameCardInfo({ game, isInCart }: GameCardInfoProps) {
  return (
    <GameCardInfoWrapper>
      <PriceSection price={game.price} afterPrice={game.discountedPrice} />
      <GameTitle className="mt-4">{game?.title}</GameTitle>
      <GameDeveloper className="mb-3">{game?.developer}</GameDeveloper>
      <GameCardRating rating={game?.rating} />

      {/** Clean separation for keeping the above server comp */}
      <PurpleButton
        data-product-id={game?.id}
        data-in-cart={isInCart ? "true" : "false"}
        className="mt-4"
      >
        Add to Cart
      </PurpleButton>
    </GameCardInfoWrapper>
  );
}
