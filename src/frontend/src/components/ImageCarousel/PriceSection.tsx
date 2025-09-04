import type { PriceSectionProps } from "@/lib/types/props";
import { GamePrice, BeforePrice, DiscountBadge } from "../Typography";
import { getPercentageRatio, formatToUSD } from "@/lib/utils/utils";

export default function PriceSection({ price, afterPrice }: PriceSectionProps) {
  if (price === null || price === undefined) {
    return <GamePrice>Invalid Price</GamePrice>;
  }
  const formattedPrice =
    price === 0 ? (
      <GamePrice className="text-2xl">FREE</GamePrice>
    ) : (
      formatToUSD(price)
    );
  let content = (
    <GamePrice className="text-2xl text-white">{formattedPrice}</GamePrice>
  );

  if (afterPrice) {
    const percentage = getPercentageRatio(price, afterPrice);
    const formattedAfterPrice = formatToUSD(afterPrice);
    content = (
      <>
        <DiscountBadge className="bg-success px-3 py-2 text-base">
          -{percentage}%
        </DiscountBadge>
        <p className="flex items-end gap-2">
          <BeforePrice className="text-lg">{formattedPrice}</BeforePrice>
          <GamePrice className="text-2xl text-white">
            {formattedAfterPrice}
          </GamePrice>
        </p>
      </>
    );
  }
  return <div className="mb-[14px] flex items-center gap-3">{content}</div>;
}
