import Hydration from "../hydration";
import HomePage from "./components/HomePage";
import { Suspense } from "react";
import Loading from "../loading";

export default function Home() {
  return (
    <Hydration>
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    </Hydration>
  );
}
