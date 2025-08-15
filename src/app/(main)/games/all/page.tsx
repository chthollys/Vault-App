import Hydration from "@/app/hydration";
import MainGrid from "./components/MainGrid";
import { TitleSection } from "./components/Title";

export default async function AllGamesPage() {
  return (
    <>
      <Hydration>
        <TitleSection />
        <MainGrid />
      </Hydration>
    </>
  );
}
