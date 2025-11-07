"use client";

import Link from "next/link";
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
import { DeleteCartItemButton, PurpleButton } from "@/UI/buttons";
import type { CartWithItems, Game } from "@repo/types";
import { useMemo } from "react";
import useCartAction from "@/app/hooks/useCartAction";
import { Button, useDisclosure } from "@heroui/react";
import Modal from "@/components/Modal";

export default function CartContainer({ cart }: CartContainerProps) {
  const cartedGames = useMemo(
    () => cart.items.map((item) => item.game),
    [cart]
  );
  return (
    <div className="flex justify-between gap-20">
      <CartDisplay cart={cart} />
      <CartCheckout games={cartedGames} />
    </div>
  );
}

interface CartConsumerProps {
  cart: CartWithItems;
}

function CartDisplay({ cart }: CartConsumerProps) {
  const { items } = cart;
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
  const {
    remove: { mutate },
  } = useCartAction();
  const { game, id } = cartItem;

  const handleRemoveItem = () => {
    mutate(id);
  };

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

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

      <>
        <DeleteCartItemButton onClick={onOpen} />
        <RemoveItemModal
          name={game.title}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          action={handleRemoveItem}
        />
      </>
    </CartItemWrapper>
  );
}

interface CartCheckoutProps {
  games: Game[];
}

function CartCheckout({ games }: CartCheckoutProps) {
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

interface RemoveItemModalProps {
  isOpen: boolean;
  name?: string;
  onOpenChange: () => void;
  onClose: () => void;
  action: () => void;
}

function RemoveItemModal({
  isOpen,
  name = "item",
  onOpenChange,
  onClose,
  action,
}: RemoveItemModalProps) {
  const handleApproveButton = () => {
    action();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onOpenChange}>
      <Modal.Content>
        <Modal.Title>Info</Modal.Title>
        <Modal.Body>Are you sure want to remove {name}?</Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            variant="flat"
            className="bg-primary text-white"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button color="danger" variant="flat" onPress={handleApproveButton}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
