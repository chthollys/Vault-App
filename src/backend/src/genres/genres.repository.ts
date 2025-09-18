import { Injectable } from "@nestjs/common";
import type { Genre, Prisma } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class GenresRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }
  async findAll(args: Prisma.GenreFindManyArgs): Promise<Genre[]> {
    try {
      return await this.prisma.genre.findMany(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch genres.");
    }
  }

  async findByUnique(args: Prisma.GenreFindUniqueArgs): Promise<Genre | null> {
    try {
      return await this.prisma.genre.findUnique(args);
    } catch (err) {
      return this.errorHandler(err, `Failed to fetch genre`);
    }
  }

  async findByGameId(id: string): Promise<{ genre: Genre }[]> {
    try {
      return await this.prisma.gameGenre.findMany({
        where: { gameId: id },
        select: { genre: true },
      });
    } catch (err) {
      return this.errorHandler(
        err,
        `Failed to fetch genre with an id of ${id}`,
      );
    }
  }
}
