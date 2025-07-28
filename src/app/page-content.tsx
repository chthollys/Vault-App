import GameGrids from "./components/GameGrids";
import FeaturedGames from "./components/FeaturedGames";
import Hydration from "./hydration";

export default function PageContent() {
  return (
    <Hydration>
      <FeaturedGames />
      <GameGrids />
    </Hydration>
  );
}
