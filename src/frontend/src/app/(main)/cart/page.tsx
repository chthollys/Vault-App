import Cart from "./components/Cart";
import TitleSection from "./components/TitleSection";

export const dynamic = "force-dynamic";
export default function CartPage() {
  return (
    <div className="col-span-2 flex">
      <div className="flex flex-col gap-6">
        <TitleSection />
        <Cart />
      </div>
    </div>
  );
}
