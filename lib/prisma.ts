import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// This line is a trick to add 'prisma' to the global scope in TypeScript
const globalForPrisma = globalThis as any;

// Check if an instance already exists on the global object.
// If not, create a new one. This single instance will be reused.
export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// In development, we assign the prisma instance to the global object.
// This is not done in production.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
