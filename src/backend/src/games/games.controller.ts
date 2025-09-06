import { Controller, Get, Param } from "@nestjs/common";
import { GamesService } from "./games.service";
import { Game } from "@prisma/client";
import type { SortingRules } from "repo/types";

@Controller("games")
export class GamesController {
  constructor(private gamesService: GamesService) {}
  @Get()
  getGames(@Param() sortingRules: SortingRules): Promise<Game[]> {
    return this.gamesService.findAll(sortingRules);
  }

  @Get()
  getGame(@Param("id") id: string): Promise<Game> {
    return this.gamesService.findById(id);
  }
}
