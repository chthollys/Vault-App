import MainGrid from "./components/MainGrid";
import Hydration from "@/app/hydration";
import Title from "./components/Title";

export default async function AllGamesPage() {
  return (
    <Hydration>
      <Title />
      <MainGrid />
    </Hydration>
  );
}
