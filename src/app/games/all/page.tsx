import { Suspense } from "react";
import MainGrid from "./components/MainGrid";
import { TitleSection } from "./components/Title";
import { LoadingSpinner } from "@/UI/Spinner";

export default async function AllGamesPage() {
  return (
    <>
      <TitleSection />
      <Suspense fallback={<LoadingSpinner />}>
        <MainGrid />
      </Suspense>
    </>
  );
}
