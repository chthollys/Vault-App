import Link from "next/link";
import { Logo } from "../Typography";
import Menu from "./Menu";
import { UserAvatarIcon } from "@/UI/icons";
import { auth } from "@/auth";
import { LoginButton } from "@/UI/buttons";

export default async function MainHeader() {
  const session = await auth();
  return (
    <nav
      className="border-glass-border shadow-glass sticky top-0 z-50 border-b-[1px] border-solid bg-[rgba(13,_17,_23,_0.85)] backdrop-blur-[20px]"
      role="navigation"
    >
      <div className="flex w-auto items-center justify-between gap-2 px-8 py-[0.375rem]">
        <Link href={"/"} className="mr-2 block">
          <Logo>Vault</Logo>
        </Link>

        <Menu />

        <div className="search-bar" role="search">
          {"SEARCH BAR IMPLEMENTATION"}
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">{"cart" /* {"VIEW SHOPPING CART"} */}</div>
          <div className="">
            {session ? (
              <UserAvatarIcon imageUrl={session.user.image} />
            ) : (
              <Link href={"/login"}>
                <LoginButton>Sign in</LoginButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
