"use client";

import { ImageCarousel } from "@/components/ImageCarousel";
import { useGames } from "../hooks/useGames";
import { PurpleBadge, FeaturedTitle } from "@/components/Typography";
import { PriceSection } from "@/components/ImageCarousel";
import { getRandomSubArray } from "@/lib/utils/utils";

export default function FeaturedGames() {
  const { data, isError, error } = useGames();

  if (isError || !data) {
    throw error;
  }

  const games = getRandomSubArray(data, 5);

  return (
    <ImageCarousel length={5}>
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
}
