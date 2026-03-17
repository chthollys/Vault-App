import { Controller, Get, Param } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { ReviewDto } from "src/dtos/review.dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("reviews")
@Serialize(ReviewDto)
@ApiTags("Reviews")
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}
  @Get("/:id")
  @ApiOperation({ summary: "Get review by id" })
  @ApiParam({ name: "id", description: "Review id" })
  @ApiOkWrappedResponse({ type: ReviewDto })
  @ApiCommonErrorResponses()
  getReview(@Param("id") id: string): Promise<ReviewDto> {
    return this.reviewsService.findById(id);
  }
}
