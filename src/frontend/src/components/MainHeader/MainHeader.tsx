import Link from "next/link";
import { Logo } from "../Typography";
import Menu from "./Menu";
import { LoginButton } from "@/UI/buttons";
import { UserActionModal } from "../UserActionModal";
import SearchBar from "@/components/MainHeader/SearchBar";
import { getUserById } from "@/lib/db/server";
import { getCurrentUser } from "@/lib/auth";

export default async function MainHeader() {
  const user = await getCurrentUser();
  let headerAction = (
    <Link href={"/login"}>
      <LoginButton>Sign in</LoginButton>
    </Link>
  );

  if (user) {
    const { image, name, email } = await getUserById(user.id);
    headerAction = (
      <UserActionModal iconUrl={image} name={name} email={email} />
    );
  }
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

        <div className="my-0 box-border max-w-md min-w-56 flex-1" role="search">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6">
          <>{headerAction}</>
        </div>
      </div>
    </nav>
  );
}
