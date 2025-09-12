import { Controller, Get } from "@nestjs/common";
import { GenresService } from "./genres.service";
import type { Genre } from "@prisma/client";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { NestedGenreDto } from "src/dtos/genre.dto";

@Controller("genres")
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Get()
  @Serialize(NestedGenreDto)
  getAllGenre(): Promise<Genre[]> {
    return this.genresService.findAll();
  }
}
