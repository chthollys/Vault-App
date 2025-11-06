"use client";

import Link from "next/link";
import { CartContextProvider, useCartContext } from "@/store/cart-context";
import { CartContainerProps, CartItemProps } from "@/lib/types/props";
import { PriceSection } from "@/components/GameSection";
import ImageOptimized from "@/components/ImageOptimized";
import { GameCardWrapper as CartItemWrapper } from "@/components/Wrapper";
import { GameTitle } from "@/components/Typography";
import {
  GameCardWrapper as CardWrapper,
  DivBottomGlassBorder,
} from "@/components/Wrapper";
import { SectionTitle } from "@/components/Typography";
import { GameBadge } from "@/UI/icons";
import { DeleteCartItemButton } from "@/UI/buttons";

export default function CartContainer({ data }: CartContainerProps) {
  return (
    <div className="flex justify-between gap-20">
      <CartContextProvider cart={data}>
        <CartDisplay />
        <CartCheckout />
      </CartContextProvider>
    </div>
  );
}

function CartDisplay() {
  const { items } = useCartContext();
  return (
    <div className="w-full min-w-[48rem]">
      <ul className="flex w-full flex-col gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <CartItem cartItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CartItem({ cartItem }: CartItemProps) {
  const { game, id } = cartItem;
  return (
    <CartItemWrapper className="w-full flex-row justify-between gap-14 px-8 py-6">
      <div className="flex gap-12">
        <Link href={`/game/${id}`}>
          <div className="w-40 overflow-hidden rounded-lg">
            <ImageOptimized
              alt="game-image"
              src={game.coverImageUrl}
              loading="eager"
              className="min-h-40 w-full object-cover transition group-hover/game-card:scale-105 hover:scale-105"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <GameBadge>{game.developer}</GameBadge>
          <GameTitle>{game.title}</GameTitle>
          <PriceSection price={game.price} afterPrice={game.discountedPrice} />
        </div>
      </div>
      <DeleteCartItemButton
        onClick={() => console.log("Delete game: ", game.title)}
      />
    </CartItemWrapper>
  );
}

function CartCheckout() {
  const { games } = useCartContext();
  return (
    <CardWrapper className="flex min-h-72 w-full max-w-[30rem] flex-col px-6 py-4">
      <SectionTitle>Checkout</SectionTitle>
      <DivBottomGlassBorder className="mb-0 pb-2"></DivBottomGlassBorder>
      <ul className="mt-6">
        {games.map((game) => (
          <li key={game.id}>
            <h1>{game.price}</h1>
            <p></p>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}
