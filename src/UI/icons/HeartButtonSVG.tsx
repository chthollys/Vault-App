import { HeartButtonSVGProps } from "@/lib/types/props";
import Wrapper from "@/components/Wrapper/base/Wrapper";

export default function HeartButtonSVG({
  id,
  isActive,
  className,
  onClick,
}: HeartButtonSVGProps) {
  let baseClasses =
    "active:bg-danger flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-black/70 backdrop-blur-[10px] transition-(--transition-fast)";
  if (isActive) {
    baseClasses += " bg-danger";
  }
  return (
    <Wrapper
      as="button"
      type="button"
      className={baseClasses}
      nextClass={className}
      data-produk-id={id}
      onClick={onClick}
    >
      <svg
        className="h-5 w-5 fill-none stroke-white stroke-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </Wrapper>
  );
}
