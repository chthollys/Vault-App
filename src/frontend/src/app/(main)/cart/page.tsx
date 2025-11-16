"use client";

import Link from "next/link";
import TitleSection from "./components/TitleSection";
import useCart from "@/app/hooks/useCart";
import { AmoungUsRed } from "@/UI/icons";
import { FeaturedPriceSpan as Typo } from "@/components/Typography";
import { Button } from "@heroui/react";
import CartContainer from "./components/CartContainer";
import useCurrentUser from "@/app/hooks/useCurrentUser";

export default function CartPage() {
  const { data: user } = useCurrentUser();
  const { data: cart } = useCart(!!user);

  return (
    <div className="col-span-2 flex flex-col gap-8">
      <TitleSection />
      {user && cart ? (
        <CartContainer cart={cart} />
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
