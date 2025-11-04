import { CartContextProvider } from "@/store/cart-context";
import Cart from "./components/Cart";
import { CartCheckout } from "./components/CartCheckout";
import TitleSection from "./components/TitleSection";
import { tryCatch } from "@/lib/types/try-catch";
import { getCart } from "@/lib/db/server";

export default async function CartPage() {
  const [data, err] = await tryCatch(getCart);
  if (err) {
    throw err;
  }
  return (
    <CartContextProvider>
      <div className="col-span-2 flex flex-col gap-8">
        <TitleSection />
        <div className="flex justify-between gap-20">
          <Cart />
          <CartCheckout />
        </div>
      </div>
    </CartContextProvider>
  );
}
