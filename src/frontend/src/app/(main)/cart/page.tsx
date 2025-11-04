"use client";

import { CartContextProvider } from "@/store/cart-context";
import Cart from "./components/Cart";
import { CartCheckout } from "./components/CartCheckout";
import TitleSection from "./components/TitleSection";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import { AmoungUsRed } from "@/UI/icons";
import { FeaturedPriceSpan as Typo } from "@/components/Typography";
import { Button } from "@heroui/react";

export default function CartPage() {
  const { data } = useCart();

  return (
    <div className="col-span-2 flex flex-col gap-8">
      <TitleSection />
      {data ? (
        <div className="flex justify-between gap-20">
          <CartContextProvider cart={data}>
            <Cart />
            <CartCheckout />
          </CartContextProvider>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <AmoungUsRed className="w-full max-w-72" />
          <Typo>Oops, looks like you're not logged in</Typo>
          <Link href={"/"}>
            <Button variant="flat" color="danger" className="mt-6" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
