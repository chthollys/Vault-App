import { PriceSection } from "@/components/GameSection";
import ImageOptimized from "@/components/ImageOptimized";
import { GameCardWrapperWithHover as CartItemWrapper } from "@/components/Wrapper";
import type { Game } from "@/lib/types/data";
import { DeleteCartItemButton } from "@/UI/buttons";
import { GameBadge } from "@/UI/icons";

interface CartItemProps {
  game: Game;
}

export default function CartItem({ game }: CartItemProps) {
  return (
    <CartItemWrapper className="w-full flex-row justify-between gap-14 px-8 py-6">
      <div className="flex gap-12">
        <div className="w-40 overflow-hidden rounded-lg">
          <ImageOptimized
            alt="game-image"
            src={game.coverImageUrl}
            priority
            className="min-h-40 w-full object-cover group-hover/game-card:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <GameBadge>{game.developer}</GameBadge>
          <p>{game.title}</p>
          <PriceSection price={game.price} afterPrice={game.discountedPrice} />
        </div>
      </div>
      <DeleteCartItemButton
        onClick={() => console.log("Delete game: ", game.title)}
      />
    </CartItemWrapper>
  );
}
