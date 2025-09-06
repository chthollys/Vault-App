import { Controller, Get, Param } from "@nestjs/common";
import { GamesService } from "./games.service";
import { Game } from "@prisma/client";

@Controller("games")
export class GamesController {
  constructor(private gamesService: GamesService) {}
  @Get()
  getGames(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get()
  getGame(@Param("id") id: string): Promise<Game> {
    return this.gamesService.findById(id);
  }
}
