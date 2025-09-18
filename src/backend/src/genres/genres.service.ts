import { Injectable, NotFoundException } from "@nestjs/common";
import { GenresRepository } from "./genres.repository";
import type { Genre } from "@prisma/client";
import { when } from "joi";

@Injectable()
export class GenresService {
  constructor(private genresRepo: GenresRepository) {}
  findAll(): Promise<Genre[]> {
    return this.genresRepo.findAll({
      where: { parentId: null },
      include: { subGenres: true },
    });
  }

  async findById(id: string): Promise<Genre> {
    const genre = await this.genresRepo.findByUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with an id of ${id} not found.`);
    }
    return genre;
  }

  async maybeFindById(id: string): Promise<Genre | null> {
    return await this.genresRepo.findByUnique({ where: { id } });
  }

  async findByGameId(id: string): Promise<Genre[]> {
    return await this.genresRepo.findAll({
      where: { games: { some: { gameId: id } } },
    });
  }
}
