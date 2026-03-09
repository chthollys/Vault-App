# Codemap

## Purpose
Section-level UI modules for the game detail page.

## Files
- `TitleSection.tsx`: Breadcrumb/title header for detail page.
- `GameInfoSection.tsx`: Two-column composition (left media/action, right metadata/reviews summary).
- `GameInfoLeftSection.tsx`: Cover image, price block, and action buttons.
- `GameInfoRightSection.tsx`: Server component fetching genres/reviews; renders metadata, description, and rating.
- `GameInfoDetail.tsx`: Name/developer/publisher/genre chips.
- `Description.tsx`: Client scrollable game description panel.
- `DetailPriceSection.tsx`: Discount-aware price rendering.
- `RatingSection.tsx`: Star rating summary with review count.
- `UserActions.tsx`: Client CTA buttons (cart/wishlist placeholders).
- `GameReviewSection.tsx`: Server review list fetcher and renderer.
- `ReviewItem.tsx`: Server review card with reviewer fetch, avatar/date/rating/comment.
- `RecentReview.tsx`: Placeholder recent-review card component.

## Notes
- Several components still include scaffold/placeholder behavior (for example wishlist action in `UserActions.tsx` and static placeholders in `RecentReview.tsx`).
