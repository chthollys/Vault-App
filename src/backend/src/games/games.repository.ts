import { Injectable } from "@nestjs/common";
import { Game } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class GamesRepository {
  constructor(private prisma: PrismaService) {}
  private errorHandler = handlePrismaError;
  async findAll(): Promise<Game[]> {
    try {
      return this.prisma.game.findMany();
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch games.");
    }
  }

  async findById(id: string): Promise<Game | null> {
    try {
      return await this.prisma.game.findUnique({ where: { id } });
    } catch (err) {
      return this.errorHandler(
        err,
        `Failed to fetch game with an id of ${id}.`,
      );
    }
  }
}
