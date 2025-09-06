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
}
