import type { FeaturedGamesProps } from "@/lib/types/props";
import { memo } from "react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PurpleBadge, FeaturedTitle } from "@/components/Typography";
import { PriceSection } from "@/components/ImageCarousel";

const FeaturedGames = memo(function FeaturedGames({
  games,
}: FeaturedGamesProps) {
  return (
    <ImageCarousel length={games.length}>
      {games.map((game) => (
        <ImageCarousel.Item
          key={game.id}
          image={game.coverImageUrl}
          href={`/games/${game.id}`}
        >
          <ImageCarousel.Overlay>
            <div className="max-w-[600px] text-white">
              <PurpleBadge>{"Featured Game"}</PurpleBadge>
              {game.title && (
                <FeaturedTitle className="mb-6">{game.title}</FeaturedTitle>
              )}

              <div className="flex gap-4">
                <PriceSection
                  price={game.price}
                  afterPrice={game.discountedPrice}
                />
              </div>
            </div>
          </ImageCarousel.Overlay>
        </ImageCarousel.Item>
      ))}
    </ImageCarousel>
  );
});

export default FeaturedGames;
