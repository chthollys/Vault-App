"use client";

import { PurpleButton } from "@/UI/buttons";
import { HeartButtonSVG } from "@/UI/icons";

export default function UserActions() {
  return (
    <div className="mt-4 flex w-full items-center justify-around gap-4">
      <PurpleButton className="flex-1">Add to Cart</PurpleButton>
      <HeartButtonSVG
        id={"game id"}
        onClick={() => console.log("Implement wishlist")}
        className="bg-glass hover:border-primary hover:bg-glass-hover h-12 w-12 flex-shrink-0 rounded-md border-2 border-white/10 text-white hover:-translate-y-[1px]"
      />
    </div>
  );
}
