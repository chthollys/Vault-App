import { Injectable, NotFoundException } from "@nestjs/common";
import { GenresRepository } from "./genres.repository";
import type { Genre } from "@prisma/client";

@Injectable()
export class GenresService {
  constructor(private genresRepo: GenresRepository) {}
  findAll(): Promise<Genre[]> {
    return this.genresRepo.findAll();
  }

  async findById(id: string): Promise<Genre> {
    const genre = await this.genresRepo.findById(id);
    if (!genre) {
      throw new NotFoundException(`Genre with an id of ${id} not found.`);
    }
    return genre;
  }

  async findByGameId(id: string): Promise<Genre[]> {
    const genresObjArray = await this.genresRepo.findByGameId(id);
    return [...genresObjArray.map((obj) => obj.genre)];
  }
}
