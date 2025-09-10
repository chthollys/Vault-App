import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma.module";
import { APP_PIPE } from "@nestjs/core";
import { GamesModule } from "./games/games.module";
import { GenresController } from "./genres/genres.controller";
import { GenresModule } from "./genres/genres.module";
import { ReviewsController } from "./reviews/reviews.controller";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    GamesModule,
    GenresModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    GenresController,
    ReviewsController,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
