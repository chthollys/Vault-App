import "dotenv/config";
import type { PrismaClient } from "src/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let adapter: PrismaPg | undefined;

export function getPrismaClientOptions(): ConstructorParameters<
  typeof PrismaClient
>[0] {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set");
  }

  if (!adapter) {
    const pool = new Pool({ connectionString });
    adapter = new PrismaPg(pool);
  }

  return { adapter };
}
