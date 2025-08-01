import { RatingStar } from "@/components/Typography";

export interface GameRatingProps {
  rating: number | undefined;
}

export default function GameRating({ rating }: GameRatingProps) {
  return (
    <div className="mb-auto flex items-center gap-3">
      <RatingStar value={rating} />
      <span className="text-white/70a text-[0.9rem]">
        {rating === 0 ? "No rating" : rating}
      </span>
    </div>
  );
}
