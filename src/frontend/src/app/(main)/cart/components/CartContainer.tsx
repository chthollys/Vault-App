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
import { DeleteCartItemButton } from "@/UI/buttons";
import type { CartItem, CartWithItems } from "@repo/types";
import React, { useCallback, useMemo, useState } from "react";
import useCartAction from "@/app/hooks/useCartAction";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
  type Selection,
} from "@heroui/react";
import Modal from "@/components/Modal";
import { FaExternalLinkAlt } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function CartContainer({ cart }: CartContainerProps) {
  return (
    <div className="flex justify-between gap-20">
      {/*<CartDisplay cart={cart} /> */}
      <CartCheckout items={cart.items} />
    </div>
  );
}

// interface CartConsumerProps {
//   cart: CartWithItems;
// }

// function CartDisplay({ cart }: CartConsumerProps) {
//   const { items } = cart;
//   return (
//     <div className="w-full min-w-[48rem]">
//       <ul className="flex w-full flex-col gap-4">
//         {items.map((item) => (
//           <li key={item.id}>
//             <CartItem cartItem={item} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function CartItem({ cartItem }: CartItemProps) {
//   const {
//     remove: { mutate },
//   } = useCartAction();
//   const { game, id } = cartItem;

//   const handleRemoveItem = () => {
//     mutate(id);
//   };

//   const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

//   return (
//     <CartItemWrapper className="w-full flex-row justify-between gap-14 px-8 py-6">
//       <div className="flex gap-12">
//         <Link href={`/game/${id}`}>
//           <div className="w-40 overflow-hidden rounded-lg">
//             <ImageOptimized
//               alt="game-image"
//               src={game.coverImageUrl}
//               loading="eager"
//               className="min-h-40 w-full object-cover transition group-hover/game-card:scale-105 hover:scale-105"
//             />
//           </div>
//         </Link>
//         <div className="flex flex-col justify-between">
//           <GameBadge>{game.developer}</GameBadge>
//           <GameTitle>{game.title}</GameTitle>
//           <PriceSection price={game.price} afterPrice={game.discountedPrice} />
//         </div>
//       </div>

//       {/* <>
//         <DeleteCartItemButton onClick={onOpen} />
//         <RemoveItemModal
//           name={game.title}
//           isOpen={isOpen}
//           onOpenChange={onOpenChange}
//           onClose={onClose}
//           action={handleRemoveItem}
//         />
//       </> */}
//     </CartItemWrapper>
//   );
// }

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

  return createPortal(
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
    </Modal>,
    document.getElementById("modal")!
  );
}

interface CartCheckoutProps {
  items: CartItem[];
}

const columns = [
  {
    key: "checkbox",
    label: "",
  },
  {
    key: "title",
    label: "Game",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export function CartCheckout({ items }: CartCheckoutProps) {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
  const [selectedItemIdForRemove, setSelectedItemIdForRemove] =
    useState<string>("");

  const {
    remove: { mutate: removeItem },
    toggle: { mutate: toggleItem },
  } = useCartAction();

  const handleToggleItem = (itemId: string) => {
    toggleItem(itemId);
  };

  const handleRemoveItem = () => {
    removeItem(selectedItemIdForRemove);
    setSelectedItemIdForRemove("");
  };

  const handleOnClickRemoveButton = (itemId: string) => {
    setSelectedItemIdForRemove(itemId);
    onOpen();
  };

  const renderCell = useCallback(
    ({ game, id, isChecked }: CartItem, columnKey: React.Key) => {
      switch (columnKey) {
        case "checkbox":
          return (
            <Checkbox
              size="lg"
              color="secondary"
              isSelected={isChecked}
              onValueChange={() => handleToggleItem(id)}
            />
          );
        case "title":
          return (
            <User
              avatarProps={{
                radius: "lg",
                size: "lg",
                src: game.coverImageUrl,
              }}
              description={game.developer}
              name={<Link href={`/game/${game.id}`}>{game.title}</Link>}
            >
              {game.title}
            </User>
          );
        case "price":
          return (
            <PriceSection
              price={game.price}
              afterPrice={game.discountedPrice}
            />
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="View Details" showArrow={true}>
                <Link href={`/game/${game.id}`} target="_blank">
                  <FaExternalLinkAlt size={20} />
                </Link>
              </Tooltip>

              <Tooltip color="danger" content="Delete item">
                <DeleteCartItemButton
                  onClick={() => handleOnClickRemoveButton(id)}
                />
              </Tooltip>
            </div>
          );
        default:
          return;
      }
    },
    []
  );

  return (
    <CardWrapper className="w-full min-w-fit p-8">
      <SectionTitle>Checkout</SectionTitle>
      <DivBottomGlassBorder />
      <Table aria-label="Cart Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              className="text-[0.9rem]"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <span className="tracking-wide">
              Cart is empty,{" "}
              <Link
                href={"/games/all"}
                className="text-blue-300 hover:underline"
              >
                start adding your games
              </Link>
            </span>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <RemoveItemModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        action={handleRemoveItem}
      />
    </CardWrapper>
  );
}
