import { Controller, Get } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { Genre } from "@prisma/client";

@Controller("genres")
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Get()
  getGenres(): Promise<Genre[]> {
    return this.genresService.findAll();
  }
}
