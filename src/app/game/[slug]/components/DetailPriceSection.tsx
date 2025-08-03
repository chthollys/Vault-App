import { GamePrice } from "@/components/Typography";

export default function DetailPriceSection() {
  return (
    <div className="mb-4 border-b-[1px] border-solid border-b-white/10 pb-4 text-left">
      <div className="mb-0 flex flex-nowrap items-center justify-between gap-4">
        {/** Discount price conditional rendering */}
        <div className="flex items-baseline gap-4">
          <GamePrice className="text-primary text-[2.5rem] font-bold">
            {"$139.99"}
          </GamePrice>
          {/** If discount rendering alternative to be added */}
        </div>
      </div>
    </div>
  );
}
