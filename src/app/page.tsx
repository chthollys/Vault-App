import GameGridsSection from "./components/GameGridsSection";
import FeaturedGames from "./components/FeaturedGames";
import Hydration from "./hydration";

export default function Page() {
  return (
    <Hydration>
      <FeaturedGames />
      <GameGridsSection />
    </Hydration>
  );
}
