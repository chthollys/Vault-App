import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class ReviewsRepository {
  constructor(private prisma: PrismaService) {}
  private errorHandler = handlePrismaError;

  async findById(id: string): Promise<Review | null> {
    try {
      return await this.prisma.review.findUnique({ where: { id } });
    } catch (err) {
      return this.errorHandler(
        err,
        `Failed to fetch review with an id of ${id}`,
      );
    }
  }

  async findAllByGameId(gameId: string): Promise<Review[]> {
    try {
      return await this.prisma.review.findMany({ where: { gameId } });
    } catch (err) {
      return this.errorHandler(err, `Failed to fetch reviews`);
    }
  }
}
