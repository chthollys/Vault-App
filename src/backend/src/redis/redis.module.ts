import { Global, Module } from "@nestjs/common";
import { createClient } from "redis";
import { REDIS_CLIENT } from "utils/constants";
import { RedisService } from "./redis.service";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = configService.getOrThrow<string>("REDIS_URL");
        const client = createClient({
          url,
          ...(url.startsWith("rediss://") ? { socket: { tls: true } } : {}),
        });
        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
