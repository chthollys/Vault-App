import { Controller, Get, Param } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { ReviewDto } from "src/dtos/review.dto";

@Controller("reviews")
@Serialize(ReviewDto)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}
  @Get("/:id")
  getReview(@Param("id") id: string) {
    return this.reviewsService.findById(id);
  }
}
