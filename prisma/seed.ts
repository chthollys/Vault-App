import { z } from "zod";
import { createGenreArraySchema } from "@/lib/schemas";
import { CreateGenreData } from "@/lib/types/data";
import db from "./db";

const seedData: CreateGenreData[] = [
  {
    name: "Indie Games",
    parentId: "cmdilx4g500043e0v9rz3d75z",
  },
  {
    name: "Puzzle Games",
    parentId: "cmdilx4g500043e0v9rz3d75z",
  },
  {
    name: "Casual Games",
    parentId: "cmdilx4g500043e0v9rz3d75z",
  },
  {
    name: "Horror Games",
    parentId: "cmdilx4g500043e0v9rz3d75z",
  },
];

const seed = async () => {
  const { success, data, error } = createGenreArraySchema.safeParse(seedData);
  if (!success) {
    console.log("Validation Error: ", z.flattenError(error));
  } else {
    try {
      // const payload = await db.genre.cindUnique();
      const response = await db.genre.createManyAndReturn({
        data,
        skipDuplicates: true,
      });
      console.log("Success! genre seeded: ", response.length);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Prisma Error: ", e.message);
      } else {
        console.error("An unknown error occurred: ", e);
      }
    }
  }
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
