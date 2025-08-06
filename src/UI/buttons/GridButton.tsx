import type { ButtonElementProps } from "@/lib/types/props";

export default function GridButton({ children, ...props }: ButtonElementProps) {
  return (
    <button
      className="text-accent-light border-accent-light hover:bg-accent-light cursor-pointer rounded-md border-[1px] border-solid bg-none px-4 py-3 font-semibold transition-(--transition-fast) hover:text-white"
      {...props}
    >
      {children}
    </button>
  );
}
