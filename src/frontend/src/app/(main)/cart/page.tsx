import Cart from "./components/Cart";
import { CartCheckout } from "./components/CartCheckout";
import TitleSection from "./components/TitleSection";

export default function CartPage() {
  return (
    <div className="col-span-2 flex flex-col gap-8">
      <TitleSection />
      <div className="flex justify-between gap-20">
        <Cart />
        <CartCheckout />
      </div>
    </div>
  );
}
