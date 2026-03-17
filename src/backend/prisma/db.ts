import { PrismaClient } from "./generated/prisma/client";
import { getPrismaClientOptions } from "../src/prisma/prisma-client-options";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient(getPrismaClientOptions());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
