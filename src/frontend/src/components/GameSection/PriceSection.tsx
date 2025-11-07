import type { PriceSectionProps } from "@/lib/types/props";
import { GamePrice, BeforePrice, DiscountBadge } from "../Typography";
import { getPercentageRatio, formatToUSD } from "@/lib/utils";

export default function PriceSection({ price, afterPrice }: PriceSectionProps) {
  if (price === null || price === undefined) {
    return <GamePrice>Invalid Price</GamePrice>;
  }
  const formattedPrice = price === 0 ? "Free" : formatToUSD(price);
  let content = <GamePrice>{formattedPrice}</GamePrice>;

  if (afterPrice) {
    const percentage = getPercentageRatio(price, afterPrice);
    const formattedAfterPrice = formatToUSD(afterPrice);
    content = (
      <>
        <DiscountBadge className="bg-[linear-gradient(135deg,_var(--primary),_var(--primary-light))]">
          -{percentage}%
        </DiscountBadge>
        <BeforePrice>{formattedPrice}</BeforePrice>
        <GamePrice>{formattedAfterPrice}</GamePrice>
      </>
    );
  }
  return <div className="flex items-center gap-3">{content}</div>;
}
