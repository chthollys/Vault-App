import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { ApiResponseInterceptor } from "./interceptors/api-response.interceptor";
import { ApiExceptionFilter } from "./filters/api-exception.filter";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";
import session from "express-session";
import { RedisService } from "./redis/redis.service";
import { RedisStore } from "connect-redis";
import Joi from "joi";
import { JwtModule } from "@nestjs/jwt";
import { IS_PROD, JWT_SECRET, SESSION_SECRET } from "utils/env";
import { GamesModule } from "./games/games.module";
import { GenresModule } from "./genres/genres.module";
import { AuthModule } from "./auth/auth.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { CartModule } from "./cart/cart.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SESSION_SECRET: Joi.string().required(),
        REDIS_URL: Joi.string().uri().required(),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_SECRET,
        signOptions: { expiresIn: "15m" },
      }),
    }),
    PrismaModule,
    RedisModule,
    GamesModule,
    GenresModule,
    AuthModule,
    ReviewsModule,
    CartModule,
  ],
  controllers: [AppController],
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    { provide: APP_FILTER, useClass: ApiExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  constructor(private redisService: RedisService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieParser(),
        session({
          store: new RedisStore({ client: this.redisService.getClient() }),
          secret: SESSION_SECRET!,
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: "none",
            maxAge: IS_PROD ? 24 * 60 * 60 * 1000 : 5 * 60 * 1000,
          },
        }),
      )
      .forRoutes("*");
  }
}
