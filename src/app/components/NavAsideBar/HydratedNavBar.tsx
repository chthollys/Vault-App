import Hydration from "@/app/hydration";
import NavAsideBar from "./NavAsideBar";

export default function HydratedNavBar() {
  return (
    <Hydration>
      <NavAsideBar />
    </Hydration>
  );
}
