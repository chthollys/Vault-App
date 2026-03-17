import { Controller, Get, Param, Query } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesFilterDto, GenreDto } from "src/dtos";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { GameDto } from "src/dtos";
import { ReviewDto } from "src/dtos/review.dto";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("games")
@ApiTags("Games")
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @Serialize(GameDto)
  @ApiOperation({ summary: "List games" })
  @ApiQuery({
    name: "categories",
    required: false,
    type: String,
    description: "Comma-separated category names",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Comma-separated sort rules",
    enum: ["newest", "popular", "highest-price", "lowest-price"],
  })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiOkWrappedResponse({ type: GameDto, isArray: true })
  @ApiCommonErrorResponses()
  getAllGame(@Query() sortingRules: GamesFilterDto): Promise<GameDto[]> {
    return this.gamesService.findAll(sortingRules);
  }

  @Get("/:id")
  @Serialize(GameDto)
  @ApiOperation({ summary: "Get game detail by id" })
  @ApiParam({ name: "id", description: "Game id" })
  @ApiOkWrappedResponse({ type: GameDto })
  @ApiCommonErrorResponses()
  getGame(@Param("id") id: string): Promise<GameDto> {
    return this.gamesService.findById(id);
  }

  @Get("/:id/genres")
  @Serialize(GenreDto)
  @ApiOperation({ summary: "List genres for a game" })
  @ApiParam({ name: "id", description: "Game id" })
  @ApiOkWrappedResponse({ type: GenreDto, isArray: true })
  @ApiCommonErrorResponses()
  getGenreByGameId(@Param("id") id: string): Promise<GenreDto[]> {
    return this.gamesService.findAllGenreByGameId(id);
  }

  @Get("/:id/reviews")
  @Serialize(ReviewDto)
  @ApiOperation({ summary: "List reviews for a game" })
  @ApiParam({ name: "id", description: "Game id" })
  @ApiOkWrappedResponse({ type: ReviewDto, isArray: true })
  @ApiCommonErrorResponses()
  getReviewsByGameId(@Param("id") id: string): Promise<ReviewDto[]> {
    return this.gamesService.findReviewsByGameId(id);
  }
}
