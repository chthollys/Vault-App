import Link from "next/link";
import { Logo } from "../Typography";
import Menu from "./Menu";
import { LoginButton } from "@/UI/buttons";
import { UserActionModal } from "../UserActionModal";
import SearchBar from "@/components/MainHeader/SearchBar";

export default async function MainHeader() {
  return (
    <nav
      className="border-glass-border shadow-glass bg-nav-bar sticky top-0 z-50 border-b-[1px] border-solid backdrop-blur-[20px]"
      role="navigation"
    >
      <div className="flex w-auto items-center justify-between gap-2 px-8 py-[0.375rem]">
        <Link href={"/"} className="mr-2 block">
          <Logo>Vault</Logo>
        </Link>

        <Menu />

        <div className="my-0 max-w-md min-w-56 flex-1" role="search">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6">
          <>
            {/* {session ? (
              <UserActionModal
                iconUrl={session.user.image}
                name={session.user.name}
                email={session.user.email}
              />
            ) : (
              <Link href={"/login"}>
                <LoginButton>Sign in</LoginButton>
              </Link>
            )} */}
          </>
        </div>
      </div>
    </nav>
  );
}
