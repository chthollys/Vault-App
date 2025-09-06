import { Expose } from "class-transformer";
import { Review } from "repo/types";

export class ReviewDto implements Review {
  @Expose() id: string;
  @Expose() userId: string;
  @Expose() gameId: string;
  @Expose() createdAt: Date;
  @Expose() comment: string;
  @Expose() rating: number;
}
