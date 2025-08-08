import { Suspense } from "react";
import MainGrid from "./components/MainGrid";
import Title from "./components/Title";
import { LoadingSpinner } from "@/UI/Spinner";

export default async function AllGamesPage() {
  return (
    <>
      <Title />
      <Suspense fallback={<LoadingSpinner />}>
        <MainGrid />
      </Suspense>
    </>
  );
}
