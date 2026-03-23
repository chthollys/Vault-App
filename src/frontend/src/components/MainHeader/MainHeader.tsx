"use client";

import Link from "next/link";
import { Logo } from "../Typography";
import Menu from "./Menu";
import { LoginButton } from "@/UI/buttons";
import { UserActionModal } from "../UserActionModal";
import SearchBar from "@/components/MainHeader/SearchBar";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function MainHeader() {
  const { data: user } = useCurrentUser();
  const isMobile = useIsMobile();

  let headerAction = (
    <Link href={"/login"}>
      <LoginButton>Sign in</LoginButton>
    </Link>
  );

  if (user) {
    const { name, image, email } = user;
    headerAction = (
      <UserActionModal iconUrl={image} name={name ?? "Guest"} email={email} />
    );
  }
  return (
    <nav
      className="border-glass-border shadow-glass bg-nav-bar sticky top-0 z-50 border-b-[1px] border-solid backdrop-blur-[20px]"
      role="navigation"
    >
      <div className="flex min-h-18 w-full items-center justify-between gap-5 px-6 py-[0.375rem] sm:px-6 lg:px-8">
        <Link href={"/"} className="mr-1 block shrink-0 sm:mr-2">
          <Logo>Vault</Logo>
        </Link>
        {!isMobile && (
          <>
            <Menu />
          </>
        )}

        <div
          className="my-0 box-border min-w-0 flex-1 md:max-w-md"
          role="search"
        >
          <SearchBar />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-6">
          <>{headerAction}</>
        </div>
      </div>
    </nav>
  );
}
