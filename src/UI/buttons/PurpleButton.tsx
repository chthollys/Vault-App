import { ButtonElementProps } from "@/lib/definitions";

export default function PurpleButton({ children }: ButtonElementProps) {
  return (
    <button
      // className={`${classes["add-to-cart-btn"]} ${isInCart ? "added" : ""}`}
      className="bg-primary hover:bg-primary-dark mt-4 cursor-pointer rounded-md border-none px-6 py-4 text-[0.9rem] font-semibold text-white transition-(--transition-fast) hover:-translate-y-[1px]"
    >
      {children}
    </button>
  );
}
