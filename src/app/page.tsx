import Hydration from "./hydration";
import HomePage from "./components/HomePage";
import { Suspense } from "react";
import { LoadingSpinner } from "@/UI/Spinner";

export default function Home() {
  return (
    <Hydration>
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    </Hydration>
  );
}
