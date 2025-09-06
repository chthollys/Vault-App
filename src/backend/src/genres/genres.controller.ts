import { Controller, Get } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { Genre } from "@prisma/client";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { NestedGenreDto } from "src/dtos/genre.dto";

@Controller("genres")
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Get()
  @Serialize(NestedGenreDto)
  getGenres(): Promise<Genre[]> {
    return this.genresService.findAll();
  }
}
