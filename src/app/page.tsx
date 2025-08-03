import GameGridsSection from "./components/GameGridsSection";
import FeaturedGames from "./components/FeaturedGames";
import Hydration from "./hydration";

export default function Home() {
  return (
    <Hydration>
      <FeaturedGames />
      <GameGridsSection />
    </Hydration>
  );
}
