import { Controller, Get } from "@nestjs/common";
import { GenresService } from "./genres.service";
import type { Genre } from "src/prisma/client";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { NestedGenreDto } from "src/dtos/genre.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("genres")
@ApiTags("Genres")
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Get()
  @Serialize(NestedGenreDto)
  @ApiOperation({ summary: "List top-level genres with sub-genres" })
  @ApiOkWrappedResponse({ type: NestedGenreDto, isArray: true })
  @ApiCommonErrorResponses()
  getAllGenre(): Promise<Genre[]> {
    return this.genresService.findAll();
  }
}
