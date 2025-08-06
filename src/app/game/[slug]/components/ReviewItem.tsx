import Image from "@/components/ImageOptimized";
import { getUserByReviewId } from "@/app/actions";
import type { Review } from "@/lib/types/data";
import { RatingStar } from "@/components/Typography";

export interface ReviewProps {
  review: Review;
}

export default async function ReviewItem({ review }: ReviewProps) {
  const data = await getUserByReviewId(review.id);
  return (
    <div className="bg-glass flex flex-col gap-3 rounded-md border-b-[1px] border-solid border-black/10 p-6 backdrop-blur-[10px] transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <Image
            src={data.avatarUrl!}
            alt="Avatar user image"
            className="h-[45px] w-[45px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-primary">{data.reviewer}</span>
            <span className="text-[0.9rem] font-normal text-white/50">
              {review.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex w-[140px] shrink-0 items-center justify-between gap-2">
          <RatingStar value={review.rating} />
          <span className="rating-value">{review.rating} / 5</span>
        </div>
      </div>
      <p className="m-0 text-base leading-[1.6] text-white/70">
        {review.comment}
      </p>
    </div>
  );
}
