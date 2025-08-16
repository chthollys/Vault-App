import { Logo } from "../Typography";

export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-4 text-left">
      <Logo className="text-3xl">Vault</Logo>
      <p>Your ultimate destination for digital games</p>
    </div>
  );
}
