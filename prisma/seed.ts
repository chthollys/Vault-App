import { z } from "zod";
import { CreateGenreData, createGenreArraySchema } from "~/lib/definitions";
import db from "./db";

const seedData: CreateGenreData[] = [
{
  name: "FPS Shooters"
},
];

const seed = async () => {
  const { success, data, error } = createGenreArraySchema.safeParse(seedData);
  if (!success) {
    console.log("Validation Error: ", z.flattenError(error));
  } else {
    try {
      const payload = await db.genre.findUnique({where: {
        name: 
      }});
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
