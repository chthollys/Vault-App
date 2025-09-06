import { Injectable } from "@nestjs/common";
import { Genre } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class GenresRepository {
  constructor(private prisma: PrismaService) {}
  private errorHandler = handlePrismaError;
  async findAll(): Promise<Genre[]> {
    try {
      return await this.prisma.genre.findMany({
        where: { parentId: null },
        include: { subGenres: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch genres.");
    }
  }

  async findById(id: string): Promise<Genre | null> {
    try {
      return await this.prisma.genre.findUnique({ where: { id } });
    } catch (err) {
      return this.errorHandler(
        err,
        `Failed to fetch genre with an id of ${id}`,
      );
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
