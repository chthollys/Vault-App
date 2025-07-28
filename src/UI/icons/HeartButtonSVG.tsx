import classes from "./HeartButtonSVG.module.css";
import { HeartButtonSVGProps } from "@/lib/definitions";

export default function HeartButtonSVG({
  id,
  active = false,
  onClick,
}: HeartButtonSVGProps) {
  return (
    <button
      type="button"
      className={`${classes["wishlist-btn"]} ${active ? "active" : ""}`}
      data-produk-id={id}
      onClick={onClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className={classes["heart-icon"]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}
