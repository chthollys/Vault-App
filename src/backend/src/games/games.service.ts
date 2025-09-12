import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import type { Game, Genre, Review } from "@prisma/client";
import { buildGamesQuery } from "utils/prisma.util";
import type { GamesQueryDto } from "src/dtos";
import { GenresService } from "src/genres/genres.service";
import { ReviewsService } from "src/reviews/reviews.service";

@Injectable()
export class GamesService {
  constructor(
    private genreService: GenresService,
    private reviewsService: ReviewsService,
    private gamesRepo: GamesRepository,
  ) {}
  async findAll(sortingRules: GamesQueryDto): Promise<Game[]> {
    const args = buildGamesQuery(sortingRules);
    const games = await this.gamesRepo.findAll(args);
    if (!games) {
      throw new NotFoundException(`Games not found.`);
    }
    return games;
  }

  async findById(id: string): Promise<Game> {
    const game = await this.gamesRepo.findById(id);
    if (!game) {
      throw new NotFoundException(`Game with an id of ${id} not found.`);
    }
    return game;
  }

  async findAllGenreByGameId(gameId: string): Promise<Genre[]> {
    return await this.genreService.findByGameId(gameId);
  }

  async findReviewsByGameId(gameId: string): Promise<Review[]> {
    return await this.reviewsService.findAllByGameId(gameId);
  }
}
