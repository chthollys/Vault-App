import { useGameCardContext } from "./GameCard";
import { formatToUSD } from "@/lib/utils/utils";
import GameCardInfoWrapper from "../Wrapper/GameCardInfoWrapper";
import { GamePrice, GameTitle } from "@/components/Typography";
import { GameDeveloper } from "@/components/Typography";
import GameRating from "./GameRating";
import PurpleButton from "@/UI/buttons/PurpleButton";

export default function GameCardInfo() {
  const { game, isInCart } = useGameCardContext();
  let price = "INVALID PRICE";
  if (game && game.price) {
    price = formatToUSD(game?.price);
  }
  return (
    <GameCardInfoWrapper>
      <GamePrice className="mb-3">{price}</GamePrice>
      <GameTitle>{game?.title}</GameTitle>
      <GameDeveloper>{game?.developer}</GameDeveloper>
      <GameRating rating={game?.rating} />

      {/** Clean separation for keeping the above server comp */}
      <PurpleButton
        data-product-id={game?.id}
        data-in-cart={isInCart ? "true" : "false"}
      >
        Add to Cart
      </PurpleButton>
    </GameCardInfoWrapper>
  );
}
