import { BeforePrice, DiscountBadge, GamePrice } from "@/components/Typography";
import { formatToUSD, getPercentageRatio } from "@/lib/utils";
import type { DetailPriceSectionProps } from "@/lib/types/props";

export default function DetailPriceSection({
  price,
  discountedPrice,
}: DetailPriceSectionProps) {
  const formattedPrice = formatToUSD(price);
  return (
    <div className="mb-4 border-b-[1px] border-solid border-b-white/10 pb-4 text-left">
      <div className="mb-0 flex flex-nowrap items-center justify-between gap-4">
        {discountedPrice ? (
          <div className="flex w-full justify-between">
            <p className="flex items-end gap-3">
              <BeforePrice className="text-xl">{formattedPrice}</BeforePrice>
              <GamePrice className="text-4xl font-bold">
                {formatToUSD(discountedPrice)}
              </GamePrice>
            </p>
            <DiscountBadge className="bg-danger h-fit px-3 py-2 text-lg">
              -{getPercentageRatio(price, discountedPrice)}%
            </DiscountBadge>
          </div>
        ) : (
          <div className="flex items-baseline gap-4">
            <GamePrice className="text-primary text-[2.5rem] font-bold">
              {formattedPrice}
            </GamePrice>
          </div>
        )}
      </div>
    </div>
  );
}
