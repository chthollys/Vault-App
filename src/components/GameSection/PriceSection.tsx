import type { PriceSectionProps } from "@/lib/types/props";
import { GamePrice, BeforePrice, DiscountBadge } from "../Typography";
import { getPercentageRatio, formatToUSD } from "@/lib/utils/utils";

export default function PriceSection({ price, afterPrice }: PriceSectionProps) {
  if (!price) {
    return <GamePrice>Invalid Price</GamePrice>;
  }
  const formattedPrice = formatToUSD(price);
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
  return <div className="mb-[14px] flex items-center gap-3">{content}</div>;
}
