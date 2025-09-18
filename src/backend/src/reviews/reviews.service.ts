import { Injectable, NotFoundException } from "@nestjs/common";
import { ReviewsRepository } from "./reviews.repository";
import { Review } from "@prisma/client";

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepo: ReviewsRepository) {}

  async findById(id: string): Promise<Review> {
    const review = await this.reviewsRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException("Review not found");
    }
    return review;
  }

  async findAllByGameId(gameId: string): Promise<Review[]> {
    return await this.reviewsRepo.findAll({ where: { gameId } });
  }
}
