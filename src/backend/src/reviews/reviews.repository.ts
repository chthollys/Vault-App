import { Injectable } from "@nestjs/common";
import { Prisma, Review } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReviewsRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findOne(args: Prisma.ReviewFindFirstArgs): Promise<Review | null> {
    try {
      return await this.prisma.review.findFirst(args);
    } catch (err) {
      return this.errorHandler(err, `Failed to fetch review`);
    }
  }

  async findAll(args: Prisma.ReviewFindManyArgs): Promise<Review[]> {
    try {
      return await this.prisma.review.findMany(args);
    } catch (err) {
      return this.errorHandler(err, `Failed to fetch reviews`);
    }
  }
}
