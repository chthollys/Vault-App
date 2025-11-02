import { Injectable } from "@nestjs/common";
import type { Game, Prisma } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GamesRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }
  async findAll(args: Prisma.GameFindManyArgs): Promise<Game[]> {
    try {
      return await this.prisma.game.findMany(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to fetch games");
    }
  }

  async findUnique(args: Prisma.GameFindUniqueArgs): Promise<Game | null> {
    try {
      return await this.prisma.game.findUnique(args);
    } catch (err) {
      return this.errorHandler(err, `Failed to fetch game`);
    }
  }
}
