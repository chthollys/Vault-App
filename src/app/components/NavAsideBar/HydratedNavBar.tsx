import Hydration from "@/app/hydration";
import NavAsideBar from "./NavAsideBar";
import { Suspense } from "react";
import { LoadingSpinner } from "@/UI/Spinner";

export default function HydratedNavBar() {
  return (
    <Hydration>
      <Suspense fallback={<LoadingSpinner />}>
        <NavAsideBar />
      </Suspense>
    </Hydration>
  );
}
