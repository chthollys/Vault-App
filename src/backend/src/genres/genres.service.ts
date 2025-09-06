import { Injectable } from "@nestjs/common";
import { GenresRepository } from "./genres.repository";
import { Genre } from "@prisma/client";

@Injectable()
export class GenresService {
  constructor(private genresRepo: GenresRepository) {}
  findAll(): Promise<Genre[]> {
    return this.genresRepo.findAll();
  }
}
