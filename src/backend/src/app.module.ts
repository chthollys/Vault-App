import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { ApiResponseInterceptor } from "./interceptors/api-response.interceptor";
import { ApiExceptionFilter } from "./filters/api-exception.filter";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { GamesModule } from "./games/games.module";
import { GenresModule } from "./genres/genres.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RedisModule } from "./redis/redis.module";
import session from "express-session";
import { RedisService } from "./redis/redis.service";
import { RedisStore } from "connect-redis";
import Joi from "joi";
import { JwtModule } from "@nestjs/jwt";

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
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "15m" },
      }),
    }),
    UsersModule,
    PrismaModule,
    GamesModule,
    GenresModule,
    ReviewsModule,
    AuthModule,
    MailModule,
    RedisModule,
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
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieParser(),
        session({
          store: new RedisStore({ client: this.redisService.getClient() }),
          secret: this.configService.get<string>("REDIS_URL")!, // Joi validated
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 5 * 60 * 1000,
          },
        }),
      )
      .forRoutes("*");
  }
}
