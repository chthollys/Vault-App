import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { Game } from "@prisma/client";
import type { SortingRules } from "repo/types";
import { buildGamesQuery } from "utils/prisma.util";

@Injectable()
export class GamesService {
  constructor(private gamesRepo: GamesRepository) {}
  async findAll(sortingRules: SortingRules): Promise<Game[]> {
    const args = buildGamesQuery(sortingRules);
    const games = await this.gamesRepo.findAll(args);
    if (!games) {
      throw new NotFoundException(`Games not found.`);
    }
    return games;
  }

  async findById(id: string) {
    const game = await this.gamesRepo.findById(id);
    if (!game) {
      throw new NotFoundException(`Game with an id of ${id} not found.`);
    }
    return game;
  }
}
