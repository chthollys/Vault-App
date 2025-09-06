import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { GamesRepository } from "./games.repository";
import { GenresModule } from "src/genres/genres.module";

@Module({
  imports: [GenresModule],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
})
export class GamesModule {}
