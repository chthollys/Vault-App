import { RatingStar } from "@/components/Typography";
import { Review } from "@/lib/types/data";

export interface RecentReviewProps {
  review: Review | undefined;
}

export default async function RecentReview({ review }: RecentReviewProps) {
  return (
    <div className="px-0 pt-4 pb-0">
      <h4 className="mb-3 text-[1.2rem] font-semibold text-white/90">
        Recent Reviews
      </h4>
      <div className="rounded-md border-b-[1px] border-solid border-white/10 bg-white/5 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-base font-semibold text-white/90">
            {"REVIEWER NAME"}
          </span>
          <div className="flex items-center gap-[0.3rem]">
            {/** Outsource stars span component */}
            <RatingStar value={4.2} />
            <span className="text-[0.9rem] text-white/50">{4.2}</span>
          </div>
        </div>
        {/** Outsource stars span component */}
        <p className="mx-0 mt-0 mb-2 text-[0.95rem] leading-[1.4] text-white/70">
          {"RATING COMMENT"}
        </p>
        <button
          type="button"
          className="text-primary hover:text-primary-light text-[0.8rem] font-semibold underline transition-(--transition-fast)"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
}
