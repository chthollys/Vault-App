import Hydration from "@/app/hydration";
import NavAsideBar from "./NavAsideBar";
import { Suspense } from "react";
import Loading from "@/app/(main)/loading";

export default function HydratedNavBar() {
  return (
    <Hydration>
      <Suspense fallback={<Loading />}>
        <NavAsideBar />
      </Suspense>
    </Hydration>
  );
}
