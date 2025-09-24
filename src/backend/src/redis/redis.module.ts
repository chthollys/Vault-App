import { Global, Module } from "@nestjs/common";
import { createClient } from "redis";
import { REDIS_CLIENT } from "utils/constants";
import { RedisService } from "./redis.service";
import { ConfigService } from "@nestjs/config";
import { REDIS_URL } from "utils/env";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async () => {
        const url = REDIS_URL;
        const client = createClient({ url, socket: { tls: true } });
        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
