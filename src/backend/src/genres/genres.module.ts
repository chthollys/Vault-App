import { Module } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { GenresRepository } from "./genres.repository";
import { GenresController } from "./genres.controller";

@Module({
  providers: [GenresService, GenresRepository],
  controllers: [GenresController],
  exports: [GenresService],
})
export class GenresModule {}
