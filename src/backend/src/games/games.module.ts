import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { GamesRepository } from "./games.repository";

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
})
export class GamesModule {}
