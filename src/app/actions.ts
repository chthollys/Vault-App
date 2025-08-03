"use server";

import db from "~/prisma/db";

export async function getGames() {
  const response = await db.game.findMany({});
  return response;
}

export async function getGame(id: string) {
  const response = await db.game.findUnique({
    where: {
      id,
    },
  });
  return response;
}
