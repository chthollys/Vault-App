import { RatingStar } from "@/components/Typography";
import { DivBottomGlassBorder } from "@/components/Wrapper";

export interface RatingSectionProps {
  rating: number;
  count?: number;
}

export default function RatingSection({ rating, count }: RatingSectionProps) {
  return (
    <DivBottomGlassBorder>
      <h4 className="mx-0 mt-0 mb-3 text-[1.1rem] font-semibold text-white/90">
        User Rating
      </h4>
      <div className="flex items-center gap-2">
        {/** Outsource stars span component */}
        <RatingStar value={rating} className="text-[1.35rem]" />
        <span className="text-[1.1rem] text-white/50">{`${rating}/5 (${count} reviews)`}</span>
      </div>
    </DivBottomGlassBorder>
  );
}
