import { Controller, Get, Param, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { Game, Genre } from "@prisma/client";
import { GamesQueryDto } from "src/dtos";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { GameDto } from "src/dtos";

@Controller("games")
@Serialize(GameDto)
export class GamesController {
  constructor(private gamesService: GamesService) {}
  @Get()
  getGames(@Query() sortingRules: GamesQueryDto): Promise<Game[]> {
    return this.gamesService.findAll(sortingRules);
  }

  @Get("/:id")
  getGame(@Param("id") id: string): Promise<Game> {
    return this.gamesService.findById(id);
  }

  @Get("/:id/genres")
  getGenreByGameId(@Param("id") id: string): Promise<Genre[]> {
    return this.gamesService.findGenresByGameId(id);
  }
}
