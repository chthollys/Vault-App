import Link from "next/link";
import { HeaderNav } from "../Typography";
import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <ul id="mobile-menu" className="flex items-center gap-6" role="menubar">
      <Link href={"/games/all"}>
        <MenuItem>
          <HeaderNav>All Games</HeaderNav>
        </MenuItem>
      </Link>

      <Link href={"/games/new-release"}>
        <MenuItem>
          <HeaderNav>New Releases</HeaderNav>
        </MenuItem>
      </Link>

      <Link href={"/games/special-offers"}>
        <MenuItem>
          <HeaderNav>Special Offers</HeaderNav>
        </MenuItem>
      </Link>
    </ul>
  );
}
