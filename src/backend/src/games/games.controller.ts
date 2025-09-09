import { Controller, Get, Param, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesQueryDto, GenreDto } from "src/dtos";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { GameDto } from "src/dtos";
import { ReviewDto } from "src/dtos/review.dto";

@Controller("games")
export class GamesController {
  constructor(private gamesService: GamesService) {}
  @Get()
  @Serialize(GameDto)
  getAllGame(@Query() sortingRules: GamesQueryDto): Promise<GameDto[]> {
    return this.gamesService.findAll(sortingRules);
  }

  @Get("/:id")
  @Serialize(GameDto)
  getGame(@Param("id") id: string): Promise<GameDto> {
    return this.gamesService.findById(id);
  }

  @Get("/:id/genres")
  @Serialize(GenreDto)
  getGenreByGameId(@Param("id") id: string): Promise<GenreDto[]> {
    return this.gamesService.findAllGenreByGameId(id);
  }

  @Get("/:id/reviews")
  @Serialize(ReviewDto)
  getReviewsByGameId(@Param("id") id: string): Promise<ReviewDto[]> {
    return this.gamesService.findReviewsByGameId(id);
  }
}
