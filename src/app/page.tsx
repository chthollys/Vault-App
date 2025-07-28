import { getGames } from "./actions";
import PageContent from "./page-content";

export default async function Home() {
  const initialGames = await getGames();
  return (
    <>
      <PageContent initialGames={initialGames} />
    </>
  );
}
