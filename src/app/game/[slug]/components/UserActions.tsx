"use client";

import HeartButtonSVG from "@/UI/icons/HeartButtonSVG";

export default function UserActions() {
  return (
    <div className="detail-actions">
      <button className="add-to-cart-btn detail-cart-btn">Add to Cart</button>
      <HeartButtonSVG
        id={"game id"}
        onClick={() => console.log("Implement wishlist")}
      />
    </div>
  );
}
