import MainGrid from "./components/MainGrid";
import { TitleSection } from "./components/Title";

export const dynamic = "force-dynamic";
export default async function AllGamesPage() {
  return (
    <div id="all-game-main-content">
      <TitleSection />
      <MainGrid />
    </div>
  );
}
