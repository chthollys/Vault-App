import { Suspense } from "react";
import MainGrid from "./components/MainGrid";
import { TitleSection } from "./components/Title";
import Loading from "@/app/loading";

export default async function AllGamesPage() {
  return (
    <>
      <TitleSection />
      <Suspense fallback={<Loading />}>
        <MainGrid />
      </Suspense>
    </>
  );
}
