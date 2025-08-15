import Link from "next/link";
import { Logo } from "../Typography";
import Menu from "./Menu";

export default function MainHeader() {
  return (
    <nav
      className="backdrop-blur-[20px] border-glass-border shadow-glass sticky top-0 z-50 border-b-[1px] border-solid bg-[rgba(13,_17,_23,_0.85)]"
      role="navigation"
    >
      <div className="flex w-auto items-center justify-between gap-2 px-8 py-[0.375rem]">
        <Link href={"/"} className="block mr-2">
          <Logo>Vault</Logo>
        </Link>

        <Menu />

        <div className="search-bar" role="search">
          {"SEARCH BAR IMPLEMENTATION"}
        </div>

        <div className="nav-icons">
          <div className="nav-icon">{"cart" /* {"VIEW SHOPPING CART"} */}</div>
          <div className="nav-icon profile">
            {
              "profile" /* {'VIEW USER PROFILE'}  check if the user was logged in */
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
