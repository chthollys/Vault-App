import { BeforePrice, DiscountBadge, GamePrice } from "@/components/Typography";
import { formatToUSD, getPercentageRatio } from "@/lib/utils";
import type { DetailPriceSectionProps } from "@/lib/types/props";
import { DivBottomGlassBorder } from "@/components/Wrapper";

export default function DetailPriceSection({
  price,
  discountedPrice,
}: DetailPriceSectionProps) {
  const formattedPrice = formatToUSD(price);
  return (
    <DivBottomGlassBorder className="w-full max-w-[30rem]">
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
    </DivBottomGlassBorder>
  );
}
