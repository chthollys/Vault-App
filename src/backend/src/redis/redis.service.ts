import { Injectable, Inject } from "@nestjs/common";
import type { RedisClientType } from "redis";
import { REDIS_CLIENT } from "utils/constants";

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly client: RedisClientType) {}

  getClient() {
    return this.client;
  }
}
