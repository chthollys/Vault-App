import MainGrid from "./components/MainGrid";
import { TitleSection } from "./components/Title";

export default async function AllGamesPage() {
  return (
    <div id="all-game-main-content">
      <TitleSection />
      <MainGrid />
    </div>
  );
}
