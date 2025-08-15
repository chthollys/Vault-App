import { GameSection } from "@/components/GameSection";
import type { GameGridsSectionProps } from "@/lib/types/props";

export default function GameGridsSection({
  hotGames,
  recommendedGames,
}: GameGridsSectionProps) {
  return (
    <div>
      <GameSection games={hotGames} title="Hot Games" href="/games/hot" />
      <GameSection
        games={recommendedGames}
        title="Recommended Games"
        href="/games/recommended"
      />
    </div>
  );
}
