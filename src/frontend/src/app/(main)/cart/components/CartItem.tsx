import { PriceSection } from "@/components/GameSection";
import ImageOptimized from "@/components/ImageOptimized";
import { GameCardWrapper as CartItemWrapper } from "@/components/Wrapper";
import { DeleteCartItemButton } from "@/UI/buttons";
import { GameBadge } from "@/UI/icons";
import { GameTitle } from "@/components/Typography";
import Link from "next/link";
import type { CartItemProps } from "@/lib/types/props";

export default function CartItem({ game, item }: CartItemProps) {
  if (!game || !item) return <></>;
  return (
    <CartItemWrapper className="w-full flex-row justify-between gap-14 px-8 py-6">
      <div className="flex gap-12">
        <Link href={`/game/${game.id}`}>
          <div className="w-40 overflow-hidden rounded-lg">
            <ImageOptimized
              alt="game-image"
              src={game.coverImageUrl}
              loading="eager"
              className="min-h-40 w-full object-cover transition group-hover/game-card:scale-105 hover:scale-105"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <GameBadge>{game.developer}</GameBadge>
          <GameTitle>{game.title}</GameTitle>
          <PriceSection price={game.price} afterPrice={game.discountedPrice} />
        </div>
      </div>
      <DeleteCartItemButton
        onClick={() => console.log("Delete game: ", game.title)}
      />
    </CartItemWrapper>
  );
}
