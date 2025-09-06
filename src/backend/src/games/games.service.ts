import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { Game } from "@prisma/client";

@Injectable()
export class GamesService {
  constructor(private gamesRepo: GamesRepository) {}
  async findAll(): Promise<Game[]> {
    const games = await this.gamesRepo.findAll();
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
