import { GameSection } from "@/components/GameSection";
import { getRandomSubArray } from "@/lib/utils/utils";
import type { GameGridsSectionProps } from "@/lib/types/props";

export default function GameGridsSection({
  hotGames,
  recommendedGames,
}: GameGridsSectionProps) {
  return (
    <div>
      <GameSection
        games={getRandomSubArray(hotGames, 5)}
        title="Hot Games"
        href="/games/hot"
      />
      <GameSection
        games={getRandomSubArray(recommendedGames, 5)}
        title="Recommended Games"
        href="/games/recommended"
      />
    </div>
  );
}
