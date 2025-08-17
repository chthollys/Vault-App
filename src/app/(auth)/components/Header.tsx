import { Logo } from "@/components/Typography";

export default function Header() {
  return (
    <nav
      className="border-glass-border shadow-glass sticky top-0 z-50 flex min-h-16 items-center border-b-[1px] border-solid bg-[rgba(13,_17,_23,_0.85)] backdrop-blur-[20px]"
      role="navigation"
      aria-label="auth-navigation"
    >
      <div className="flex h-full w-auto items-center justify-between gap-2 px-8 py-[0.375rem]">
        <Logo className="hover:cursor-default">Vault</Logo>
      </div>
    </nav>
  );
}
