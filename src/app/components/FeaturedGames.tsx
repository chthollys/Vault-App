"use client";

import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { useGames } from "../hooks/useGames";
import { formatToUSD } from "@/lib/utils/utils";

export default function FeaturedGames() {
  const { data, isError, error } = useGames();

  if (isError || !data) {
    throw error;
  }

  return (
    <ImageCarousel length={5}>
      {data.slice(0, 5).map((game) => (
        <ImageCarousel.Item
          key={game.id}
          image={game.coverImageUrl}
          href={`/games/${game.id}`}
        >
          <ImageCarousel.Overlay
            label="Featured Game"
            title={game.title}
            content={formatToUSD(game.price)}
          />
        </ImageCarousel.Item>
      ))}
    </ImageCarousel>
  );
}
