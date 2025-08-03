import GameCardInfoWrapper from "@/components/Wrapper/GameCardInfoWrapper";
import { GamePrice, GameTitle, GameDeveloper } from "@/components/Typography";
import GameCardRating from "./GameCardRating";
import PurpleButton from "@/UI/buttons/PurpleButton";
import { GameCardInfoProps } from "@/lib/types/props";
import { formatToUSD } from "@/lib/utils/utils";

export default function GameCardInfo({ game, isInCart }: GameCardInfoProps) {
  let price = "INVALID PRICE";
  if (game && game.price) {
    price = formatToUSD(game?.price);
  }
  return (
    <GameCardInfoWrapper>
      <GamePrice className="mb-3">{price}</GamePrice>
      <GameTitle>{game?.title}</GameTitle>
      <GameDeveloper>{game?.developer}</GameDeveloper>
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
